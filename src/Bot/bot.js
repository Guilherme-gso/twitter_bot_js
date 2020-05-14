import Utils from './utils';
import client from '../auth/config';

const utils = new Utils();

class Bot {
  constructor() {
    this.stream();
  }

  stream() {
    // gera uma palavra aleatoria e passa como track
    const word = utils.readFile();
    const random = Math.floor(word.length * Math.random());
    const randomWord = word[random].toLowerCase();

    const clientStream = client.stream('statuses/filter', {
      track: randomWord,
    });

    // monitora os tweets com a palavra filtrada
    clientStream.on('tweet', tweet => {
      const { text } = tweet;
      const replaceTweet = text.replace(text[random], randomWord);

      if(text.includes('RT @')) return;

       if(text.indexOf('.') < 0) {
          this.makeTweet(`${replaceTweet}`);
       }

        return;
    });
  }

  makeTweet(tweet) {
    client.post('statuses/update', {status: tweet}).then(response => {
      if(response.resp.statusCode === 200) {
        console.log(`Tweet realizado com o status: ${tweet}`);
      }
    }).catch(err => {
      console.log(err);
    })
  }
}

export default Bot;
