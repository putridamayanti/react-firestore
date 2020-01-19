import React, { Component } from 'react';
import { Container, Content, Body, Left, Right, Text, Card, CardItem,
Button, Icon, Item, Form, Input, Textarea } from 'native-base';

export default class EditPostScreen extends React.Component {

	constructor(props) {
		super(props);

	}

	render() {
		return (
			<>
				<Container>
					<Content padder style={{ padding: 20 }}>
						<Form>
							<Item regular>
					            <Input placeholder='Title'/>
					         </Item>

					         <Textarea rowSpan={5} bordered placeholder="Your Content" />

					         <Button block success
					         style={{ marginTop: 10 }}>
					            <Text>Submit</Text>
					          </Button>
				         </Form>
					</Content>
				</Container>
			</>
		);
	}
}