import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const mapUrls = {
  '新北市立新莊體育館': 'https://www.google.com.tw/maps/place/%E6%96%B0%E8%8E%8A%E9%AB%94%E8%82%B2%E9%A4%A8/@25.0404627,121.4492624,17z/data=!4m6!3m5!1s0x3442a98841515499:0x3ed04d855c8fd80!8m2!3d25.0404627!4d121.4518373!16s%2Fg%2F155sqwqs?entry=ttu',
  '臺北和平籃球館' : 'https://www.google.com.tw/maps/place/%E8%87%BA%E5%8C%97%E5%92%8C%E5%B9%B3%E7%B1%83%E7%90%83%E9%A4%A8/@25.0215286,121.5437424,16.94z/data=!4m6!3m5!1s0x3442aa2f77945a93:0x45a5db9944b0fce9!8m2!3d25.0215212!4d121.5453433!16s%2Fg%2F155rpmh8?entry=ttu',
  '桃園市立綜合體育館（桃園巨蛋）' : 'https://www.google.com.tw/maps/place/%E6%A1%83%E5%9C%92%E5%B8%82%E7%AB%8B%E7%B6%9C%E5%90%88%E9%AB%94%E8%82%B2%E9%A4%A8%EF%BC%88%E6%A1%83%E5%9C%92%E5%B7%A8%E8%9B%8B%EF%BC%89/@24.9950238,121.3212893,17.67z/data=!4m6!3m5!1s0x34681f828e41513d:0x7ac11342c6a2e48a!8m2!3d24.9951773!4d121.3228877!16s%2Fg%2F11tggsm67x?entry=ttu',
  '新竹縣體育館' : 'https://www.google.com.tw/maps/place/%E6%96%B0%E7%AB%B9%E7%B8%A3%E9%AB%94%E8%82%B2%E9%A4%A8/@24.8198826,121.0174302,17z/data=!3m1!4b1!4m6!3m5!1s0x346836f0efc4a179:0x18e43ed686ca04a8!8m2!3d24.8198826!4d121.0200051!16s%2Fg%2F1yh7_r_07?entry=ttu',
  '臺中洲際迷你蛋' : 'https://www.google.com.tw/maps/place/%E8%87%BA%E4%B8%AD%E6%B4%B2%E9%9A%9B%E6%A3%92%E7%90%83%E5%A0%B4%E9%99%84%E5%B1%AC%E5%A4%9A%E5%8A%9F%E8%83%BD%E9%81%8B%E5%8B%95%E4%B8%AD%E5%BF%83%EF%BC%88%E6%B4%B2%E9%9A%9B%E8%BF%B7%E4%BD%A0%E8%9B%8B%EF%BC%89/@24.1982068,120.6823103,17z/data=!3m1!4b1!4m6!3m5!1s0x346917a3ca32fd2b:0x5884f15b44ad3193!8m2!3d24.1982068!4d120.6848852!16s%2Fg%2F11g8bb531n?entry=ttu',
  '高雄市鳳山體育館' : 'https://www.google.com.tw/maps/place/%E9%AB%98%E9%9B%84%E5%B8%82%E9%B3%B3%E5%B1%B1%E9%AB%94%E8%82%B2%E9%A4%A8/@22.6210894,120.351925,17z/data=!3m1!4b1!4m6!3m5!1s0x346e1b48a3d110e9:0x33230e159cb1b0c5!8m2!3d22.6210894!4d120.3544999!16s%2Fm%2F026b6yx?entry=ttu',
};

export default StadiumInfo = ({ content }) => {
  
    return (
    <View style={styles.content}>
      <Text style={styles.title}>{content?.name} </Text>
      {
        mapUrls[content?.name] ? (
          <WebView
            source={{ uri: mapUrls[content?.name] }}
            style={styles.map}
          />
        ) : (
          <Text style={styles.error}>無法顯示地圖</Text>
        )
      }
      <Text style={styles.title}>場館資訊 </Text>
      <Text style={styles.paragraph}>{ `場館地址 ：${content?.address}` }</Text>
      <Text style={styles.paragraph}>{ `聯絡電話 ：${content?.contact}` }</Text>
      <Text style={styles.paragraph}></Text>
    </View>
  )
}


const styles = StyleSheet.create({
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  title: {
    fontSize: 20,
    marginVertical: 5,
    lineHeight: 24,
    fontWeight: 'bold',
    color: 'black',
  },
  paragraph: {
    fontSize: 16,
    marginVertical: 5,
    lineHeight: 24,
    color: 'black',
  },
  map: {
    width: '100%',
    height: 450,
    marginVertical: 20,
  },
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 20,
  },

});