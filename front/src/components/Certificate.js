import React from 'react';
import { PDFViewer, Document, Page, Font, View, Text, StyleSheet, Image } from '@react-pdf/renderer';
import fontRegular from '../fonts/Nasu-Regular.ttf'
import image from '../images/Certificate.png'

const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#f2f2f2',
  },
  courseContainer: {
    flex: 1,
  },
  a: {
    marginTop: 160,
  },
  name: {
    fontSize: 40,
    marginBottom: 10,
    marginTop: 20,
    textAlign: 'center',
    fontFamily: 'Nasu-Regular',
    color: '#1E686F',
  },
  course: {
    fontSize: 16,
    marginBottom: 10,
    marginTop: 10,
    textAlign: 'center',
    fontFamily: 'Nasu-Regular',
    color: '#201A40',
  },
  author: {
    fontSize: 12,
    marginTop: 12,
    textAlign: 'center',
    fontFamily: 'Nasu-Regular',
    color: '#201A40',
  },
  date: {
    fontSize: 12,
    marginTop: 22,
    textAlign: 'center',
    fontFamily: 'Nasu-Regular',
    color: '#201A40',
  },
  id: {
    fontSize: 12,
    marginTop: 2,
    textAlign: 'center',
    fontFamily: 'Nasu-Regular',
    color: '#201A40',
  },
  pageBackground: {
    position: 'absolute',
    minWidth: '100%',
    minHeight: '100%',
    display: 'block',
    height: '100%',
    width: '100%',
  },
});

function Certificate(props) {
  const { name, cource, author, date, id } = props;
  Font.register({
    family: 'Nasu-Regular',
    src: fontRegular
  });

  return (
    <PDFViewer width="100%" height="600" fileName="修了書">
      <Document>
        <Page size={[600, 400]} style={styles.page}>
          <View style={styles.courseContainer}>
              <Image src={image} style={styles.pageBackground}/>
              <Text style={styles.a}></Text>
              <Text style={styles.name}>{name}</Text>
              <Text style={styles.course}>{cource}</Text>
              <Text style={styles.author}>{author}</Text>
              <Text style={styles.date}>合格日：{date}</Text>
              <Text style={styles.id}>修了証ID：{id}</Text>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Certificate;
