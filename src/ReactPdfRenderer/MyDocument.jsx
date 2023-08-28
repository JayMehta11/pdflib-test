import { Font } from '@react-pdf/renderer';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
// const GUJSTRING = process.env.GUJARATI_STRING;

Font.register({
  family: 'Noto Serif Bengali',
  fontStyle: 'normal',
  fontWeight: 400,
  src: 'https://fonts.gstatic.com/s/notoserifbengali/v19/hYkuPvggTvnzO14VSXltirUdnnkt1pwmWrprmO7RjE0a5BtdATYU1crFaM_5JfcAHnqn.ttf',
});
Font.register({
  family: 'Noto Sans Telugu',
  fontStyle: 'normal',
  fontWeight: 400,
  src: 'https://fonts.gstatic.com/s/notosanstelugu/v25/0FlxVOGZlE2Rrtr-HmgkMWJNjJ5_RyT8o8c7fHkeg-esVC5dzHkHIJQqrEntezbqQQ.ttf',
});
Font.register({
  family: 'Noto Sans',
  fontStyle: 'normal',
  fontWeight: 400,
  src: 'https://fonts.gstatic.com/s/notosans/v28/o-0IIpQlx3QUlC5A4PNb4g.ttf',
});
Font.register({
  family: 'Noto Sans Gujarati',
  fontStyle: 'normal',
  fontWeight: 400,
  src: 'https://fonts.gstatic.com/s/notosansgujarati/v23/wlpWgx_HC1ti5ViekvcxnhMlCVo3f5pv17ivlzsUB14gg1TMR2Gw4VceEl7MA_ypFwPM.ttf',
});
// Font.register({
//   family: 'Noto Serif Gujarati',
//   fontStyle: 'normal',
//   fontWeight: 400,
//   src: 'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf',
// });

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    // fontStyle: 'normal',
    // fontFamily: 'Noto Sans Gujarati',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '1',
  },
});

// Create Document Component
export const MyDocument = () => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        <View style={styles.section}>
          <Text style={{ fontFamily: 'Noto Sans', marginBottom: '15pt' }}>
            {import.meta.env.VITE_ENGLISH_STRING}
          </Text>
          <Text style={{ fontFamily: 'Noto Sans', marginBottom: '15pt' }}>
            {import.meta.env.VITE_HINDI_STRING}
          </Text>
          <Text style={{ fontFamily: 'Noto Sans Gujarati', marginBottom: '15pt' }}>
            {import.meta.env.VITE_GUJARATI_STRING}
          </Text>
          <Text style={{ fontFamily: 'Noto Serif Bengali', marginBottom: '15pt' }}>
            {import.meta.env.VITE_BENGALI_STRING}
          </Text>
          <Text style={{ fontFamily: 'Noto Sans Telugu', marginBottom: '15pt' }}>
            {import.meta.env.VITE_TELUGU_STRING}
          </Text>
        </View>
      </Page>
    </Document>
  );
};
