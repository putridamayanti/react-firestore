import React, { Component } from 'react';
import { Container, Content, Body, Left, Right, Text, Card, CardItem,
Button, Icon, Item, Form, Input, Textarea } from 'native-base';

import firebase from '../services/firebase';

export default class FormPostScreen extends React.Component {

	constructor(props) {
		super(props);
		
		const id = this.props.navigation.getParam('id', '');
		this.state = {
			id: id ? id : '',
			title: '',
			content: ''
		}

	}

	componentDidMount() {
		console.log(this.state.id);
		if (this.state.id !== '') {
			const ref = firebase.firestore().collection('blog').doc(this.state.id);
		
		ref.get().then((doc) => {
		    if (doc.exists) {
		      const post = doc.data();
		      this.setState({
		        title: post.title,
		        content: post.content,
		      });
		    } else {
		      console.log("No such document!");
		    }
		 });
		}
	}

	changeInput(value, field) {
		const state = this.state;
		state[field] = value;
		console.log(state);
		this.setState(state);
	}

	submit() {
		if (this.state.id == '') {
			console.log('add');
			const ref = firebase.firestore().collection('blog');

			ref.add({
					title: this.state.title,
					content: this.state.content
				}).then(result => {
					this.setState({
						title: '',
						content: ''
					});
					this.props.navigation.goBack();
				});
		} else {
			const ref = firebase.firestore().collection('blog').doc(this.state.id);

			ref.set({
				title: this.state.title,
				content: this.state.content 
			}).then(result => {
				this.setState({
					title: '',
					content: ''
				});
				this.props.navigation.navigate('Post');
			});
		}
	}

	delete() {
		firebase.firestore().collection('blog').doc(this.state.id).delete().then(result => {
			console.log(result);
			this.props.navigation.navigate('Post');
		});
	}

	render() {
		return (
			<>
				<Container>
					<Content padder style={{ padding: 20 }}>
						<Form>
							<Item regular>
					            <Input placeholder='Title'
					            value={this.state.title}
					            onChangeText={(value) => this.changeInput(value, 'title')}/>
					         </Item>

					         <Textarea rowSpan={5} bordered placeholder="Your Content" 
					         value={this.state.content}
					         onChangeText={(value) => this.changeInput(value, 'content')}/>

					         <Button block success
					         style={{ marginTop: 10 }} onPress={() => this.submit()}>
					            <Text>Submit</Text>
					          </Button>

					         { this.state.id !== '' ? (
								<Button block danger
						         style={{ marginTop: 25 }} onPress={() => this.delete()}>
						            <Text>Delete</Text>
						          </Button>
					         	) : <></>

					         }
				         </Form>
					</Content>
				</Container>
			</>
		);
	}
}