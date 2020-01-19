import React, { Component } from 'react';
import { Container, Content, Body, Left, Right, Text, Card, CardItem,
Button, Icon } from 'native-base';
import { View, ActivityIndicator } from 'react-native';

import firebase from '../services/firebase';

export default class PostScreen extends React.Component {

	static navigationOptions = ({ navigation }) => {
	  return {
	    title: 'Board List',
	    headerRight: (

	      <Button iconLeft warning onPress={() => navigation.navigate('FormPost')}>
				            <Icon name='add' />
				        </Button>
	    ),
	  };
	};

	constructor(props) {
		super(props);

		this.ref = firebase.firestore().collection('blog');
  		this.unsubscribe = null;
		this.state = {
		    isLoading: true,
		    posts: []
		};

		this.onCollectionUpdate = this.onCollectionUpdate.bind(this);

	}

	componentDidMount() {
	  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	onCollectionUpdate(querySnapshot) {
	  const posts = [];
	  querySnapshot.forEach((doc) => {
	    const { title, content } = doc.data();
	    posts.push({
	      key: doc.id,
	      doc, // DocumentSnapshot
	      title,
	      content,
	    });
	  });
	  this.setState({
	    posts,
	    isLoading: false,
	 });
	}

	postItem(id, title, content) {
		return (
			<Card>
				<CardItem>
					<Left>
						<Body>
							<Text>{ title }</Text>
						</Body>
					</Left>
					<Right>
						<Button iconLeft warning onPress={() => this.props.navigation.navigate('FormPost', {id: id})}>
				            <Text>Edit</Text>
				        </Button>
					</Right>
				</CardItem>
				<CardItem>
					<Body>
						<Text>
							{ content }
						</Text>
					</Body>
				</CardItem>
			</Card>
		);
	}
	
	render() {
		 if(this.state.isLoading){
		    return(
		      <View>
		        <ActivityIndicator size="large" color="#0000ff"/>
		      </View>
		    )
		  }

		  if (this.state.posts.length == 0) {
		  	return (
				<>
					<Container>
						<Content>
							<Text>No Data</Text>
						</Content>
					</Container>
				</>
			);
		  }
		return (
			<>
				<Container>
					<Content>
						{ this.state.posts.map((item, i) => (
							<View key={i}>
								{ this.postItem(item.key, item.title, item.content)}
							</View>
						))}
					</Content>
				</Container>
			</>
		);
	}
}