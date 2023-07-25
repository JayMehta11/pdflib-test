import { Font } from '@react-pdf/renderer';
import { Rect } from '@react-pdf/renderer';
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { useRef } from 'react';

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
Font.register({
  family: 'Noto Serif Gujarati',
  fontStyle: 'normal',
  fontWeight: 400,
  src: 'https://fonts.gstatic.com/s/notoserifgujarati/v26/hESa6WBlOixO-3OJ1FTmTsmqlBRUJBVkcgNLpdsspzP2HuYycIzu.ttf',
});

// Create styles
const styles = StyleSheet.create({
  page: {
    // flexDirection: 'row',
    backgroundColor: '#E4E4E4',
    fontFamily: 'Noto Serif Gujarati',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
export const MyDocument = () => {
  const textRef = useRef();
  const viewRef = useRef();
  useEffect(() => {
    console.log('tempRef', textRef);
  }, [textRef]);

  const getRender = (val) => {
    console.log('render val', val);
  };
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* <View style={styles.section}>
        <Text>Section #1</Text>
      </View> */}
        <View ref={viewRef}>
          <Text x={60} y={10} ref={textRef} wrap={false} debug={true}>
            Section #2 સરકારથી સરકાર (Government to Government) એક સરકારી સંસ્થા, એજન્સી કે વિભાગ
            અન્યસંસ્થા છે, જ્યારે 20 પ્રતિકૃતિમાં ગ્રાહક એક સ્વતંત્ર વ્યક્તિ છે. afafadfadfa
          </Text>
          <Rect height={10} width={10} />
          <Text>
            સરકારી સંસ્થા, એજન્સી કે વિભાગ સાથે વાણિજયરહિત (non-commercial) સંદેશાવ્યવહાર કરે, તો
            તેને
          </Text>
          <Text>
            સરકારથી સરકાર (026) તરીકે ઓળખવામાં આવે છે. 1૧ ખર્ચાને ઘટાડવા, પ્રક્રિયાઓને સુનિયોજિત
          </Text>
          <Text>
            બનાવવા અને કાર્યાલયોને વધુ અસરકારક બનાવવા આ માહિતીનું વિવરણ મદદરૂપ બને છે. ઉપર વિવેચિત
          </Text>
          <Text>
            તમામ ઇ-કોમર્સ પ્રતિકૃતિઓમાં 820 અને 828 વિપુલ પ્રમાણમાં ઉપયોગમાં લેવામાં આવતી પ્રતિકૃતિઓ
          </Text>
          <Text>છે. આ બંને પ્રતિકૃતિમાં મુખ્ય તફાવત ગ્રાહક& છે પ્રતિકૂતિમાં </Text>
          <Text>અંગે</Text>
        </View>
      </Page>
    </Document>
  );
};
