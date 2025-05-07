
import React from 'react';
import {
    Document,
    Page,
    Text,
    View,
    StyleSheet,
    Font,
    Image,
    PDFDownloadLink,
} from '@react-pdf/renderer';
try {
    Font.register({
        family: 'Rubik',
        src: '/fonts/Rubik-Regular.ttf',
    });
} catch (error) {
    console.error('❌ error in the font:', error);
}
const generateVoucherCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (let i = 0; i < 10; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
};
const voucherCode = generateVoucherCode();
const styles = StyleSheet.create({
    page: {
        flexDirection: 'column',
        padding: 30,
        fontFamily: 'Rubik',
        direction: 'ltr',
    },
    logo: {
        width: 120,
        height: 60,
        marginBottom: 20,
        alignSelf: 'center',
    },
    text: {
        fontSize: 14,
        marginBottom: 12,
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: 'white',
        padding: '10px 20px',
        borderRadius: '5px',
        textAlign: 'center',
        border: 'none',
        cursor: 'pointer',
        fontSize: '16px',
        display: 'inline-block',
    },
});

const MyDocument = ({ amount }) => {
    return (
        <Document>
            <Page size="A4" style={[styles.page, { border: '2px solid #4CAF50', padding: 20, borderRadius: 10 }]}>
                <View>
                    <Image
                        style={{ width: 150, alignSelf: 'center', marginBottom: 20 }}
                        src="../image.png" 
                    />
                    <Text style={[styles.text, { fontSize: 28, fontWeight: 'bold', textAlign: 'center', color: '#4CAF50', marginBottom: 10 }]}>
                        Gift Voucher
                    </Text>
                    <Text style={[styles.text, { textAlign: 'center', fontSize: 18, marginBottom: 20 }]}>
                        Congratulations! This voucher entitles you to a purchase worth:
                    </Text>
                    <Text style={[styles.text, { fontSize: 36, fontWeight: 'bold', textAlign: 'center', color: '#FF5722', marginVertical: 20 }]}>
                        ${amount}
                    </Text>

                    <Text style={[styles.text, { textAlign: 'center', fontSize: 16, marginBottom: 20 }]}>
                        Use this voucher at any of the participating stores listed below.
                    </Text>
                    <Text
                        style={[
                            styles.text,
                            {
                                fontSize: 18,
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#FF5722',
                                marginVertical: 20,
                            },
                        ]}
                    >
                        Voucher Code: {voucherCode}
                    </Text>
                    <View style={{ marginVertical: 20, padding: 10, border: '1px solid #ccc', borderRadius: 5, backgroundColor: '#f9f9f9' }}>
                        <Text style={[styles.text, { fontWeight: 'bold', textAlign: 'center', fontSize: 16, color: '#333', marginBottom: 10 }]}>
                            Participating Stores:
                        </Text>
                        <Text style={[styles.text, { fontSize: 14, textAlign: 'center', marginBottom: 5 }]}>- Amazon</Text>
                        <Text style={[styles.text, { fontSize: 14, textAlign: 'center', marginBottom: 5 }]}>- Walmart</Text>
                        <Text style={[styles.text, { fontSize: 14, textAlign: 'center', marginBottom: 5 }]}>- Target</Text>
                        <Text style={[styles.text, { fontSize: 14, textAlign: 'center', marginBottom: 5 }]}>- Best Buy</Text>
                    </View>
                    <Text style={[styles.text, { textAlign: 'center', fontSize: 16, marginTop: 30, color: '#4CAF50' }]}>
                        Thank you for choosing our service!
                    </Text>
                    <Text style={[styles.text, { marginTop: 20, fontSize: 10, textAlign: 'center', color: '#888' }]}>
                        Terms and conditions apply. This voucher is non-refundable and cannot be exchanged for cash.
                    </Text>
                </View>
            </Page>
        </Document>
    );
};

const PdfFormGenerator = ({ amount }) => {
    return (
        <PDFDownloadLink
            document={<MyDocument amount={amount} />}
            fileName="gift-voucher.pdf"
        >
            {({ loading, error }) => {
                if (error) {
                    console.error('❌ Error generating PDF', error);
                    return 'Error generating PDF';
                }
                return (
                    <button style={styles.button}>
                        {loading ? '📦 Creating the voucher...' : '⬇️ Download the voucher'}
                    </button>
                );
            }}
        </PDFDownloadLink>
    );
};

export default PdfFormGenerator;