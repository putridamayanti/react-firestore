import React, { Component } from 'react';
import { Container, Content, Body, Left, Right, Text, Card, CardItem,
Button, Icon, Item, Form, Input, Textarea } from 'native-base';

import firebase from '../services/firebase';

export default class AddPostScreen extends React.Component {

	constructor(props) {
		super(props);

		this.ref = firebase.firestore().collection('blog');

		this.state = {
			title: '',
				content: ''
		}

	}

	changeInput(value, field) {
		const state = this.state;
		state[field] = value;
		console.log(state);
		this.setState(state);
	}

	submit() {
		this.ref.add({
			title: this.state.Titlee,
			content: this.state.content
		}).then(result => {
			this.setState({
				title: '',
				content: ''
			});
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
					            onChangeText={(value) => this.changeInput(value, 'title')}/>
					         </Item>

					         <Textarea rowSpan={5} bordered placeholder="Your Content" 
					         onChangeText={(value) => this.changeInput(value, 'content')}/>

					         <Button block success
					         style={{ marginTop: 10 }} onPress={() => this.submit()}>
					            <Text>Submit</Text>
					          </Button>
				         </Form>
					</Content>
				</Container>
			</>
		);
	}
}