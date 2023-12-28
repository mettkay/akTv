import {StyleSheet, TextInput, View, Text} from 'react-native';
import React, {Component} from 'react';
import {api} from '../api/index';
import * as cheerio from 'cheerio';

interface StateType {
  keyword: string;
  dataList: Array<Movie>;
}

interface PropsType {}

interface Movie {
  imgUrl: string;
  name: string;
  describe: string;
  type: number;
  path: string;
}

export default class HomeScreen extends Component<PropsType, StateType> {
  constructor(props: PropsType) {
    super(props);
    this.state = {keyword: '', dataList: []};
  }

  onChangeText = (text: string) => {
    this.setState({keyword: text});
  };

  onSubmit = async () => {
    console.log(
      '%c 🍦 this.state.keyword: ',
      'font-size:20px;background-color: #ED9EC7;color:#fff;',
      this.state.keyword,
    );
    const [e, r] = await api.getMovieListByText(this.state.keyword);
    if (!e && r) {
      const $ = cheerio.load(r as string);
      const resultList = $('.result-item');

      const movies = [];
      for (let i = 0; i < resultList.length; i++) {
        const dom = resultList.eq(i) as any;

        const item: Movie = {
          imgUrl: dom.find('img').attr('src').trim().replace('-150x150', ''),
          name: dom.find('.title a').text().trim(),
          describe: dom.find('.contenido p').text().trim(),
          type: dom.find('.thumbnail span').text().trim() === 'Movie' ? 1 : 2,
          path: '',
        };

        if (item.type === 1) {
          item.path = dom
            .find('.thumbnail a')
            .attr('href')
            .trim()
            .match(/movies\/(\S*)/)[1];
        } else {
          item.path = dom
            .find('.thumbnail a')
            .attr('href')
            .trim()
            .match(/tvshows\/(\S*)/)[1];
        }
        movies.push(item);
      }
      console.log(
        '%c 🍵 movies: ',
        'font-size:20px;background-color: #F5CE50;color:#fff;',
        movies,
      );

      this.setState({dataList: movies});
    }
  };

  render() {
    const {dataList} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          placeholder="输入电影名"
          style={styles.input}
          onChangeText={text => this.onChangeText(text)}
          onSubmitEditing={() => this.onSubmit()}
        />
        {dataList.map(item => (
          <View key={item.name}>
            <Text>{item.name}</Text>
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
  },
  input: {
    backgroundColor: '#f5f5f5',
    height: 40,
    borderRadius: 20,
    margin: 20,
    padding: 10,
  },
});
