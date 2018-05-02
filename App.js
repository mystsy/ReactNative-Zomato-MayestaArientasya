
import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Card, CardItem, Thumbnail, Text, Button, Icon, Left, Body, Right, Footer, FooterTab, Item, Input, View} from 'native-base';
import axios from 'axios'

export default class Apply extends Component {
    constructor(){
        super()
        this.state = { 
            resto : [], 
            search : ""
    
        }
    }

    get = () => {
      var uri = `https://developers.zomato.com/api/v2.1/search?q=${this.state.search}`;
      var config = {
        headers:{'user-key':'05197f04034939b38857059a4b00ca33'}
    }

      axios.get(uri, config).then((ambilData)=>{
        this.setState({
          resto : ambilData.data.restaurants,
        })
      })
    };


    renderResto() {
        return this.state.resto.map((item,i) =>
        <Card key={i}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri: item.restaurant.thumb}} />
                <Body>
                  <Text>{item.restaurant.name}</Text>
                  <Text note>{item.restaurant.location.city}</Text>
                </Body>
              </Left>
              <Right>
                <Text>Rp{item.restaurant.average_cost_for_two}</Text>
              </Right>
            </CardItem>
            <CardItem cardBody>
              <Image source={{uri: item.restaurant.thumb}} style={{height: 300, width: null, flex: 1}}/>
            </CardItem>
            <CardItem>
              <Left>
                <Icon name='home' />
                <Text>{item.restaurant.location.address}</Text>
              </Left>
            </CardItem>
          </Card>
        );
    }

  render() {
    return (
      <Container>
        <Header searchBar>
          <Item>
            <Icon name="ios-search" />
            <Input placeholder="Search" onChangeText={(item) => {this.setState({search :item})}} />
          </Item>
        </Header>
          <Button transparent onPress={() => {this.get()}}>
            <Text>Search</Text>
          </Button>
          
        <View style={{ flex: 1 }}>
        <Content>
          {this.renderResto()}
        </Content>
        </View>
      </Container>
    );
  }
}
export default App;