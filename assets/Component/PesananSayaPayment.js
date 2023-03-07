import {View, Text, Pressable, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {FlatList} from 'react-native';
import adjust, {formatter, GrayBold, GrayFade, Oranges} from '../utils';
import RNFetchBlob from 'rn-fetch-blob';
import {PermissionsAndroid} from 'react-native';
import {PermisionStorage} from '../API/Permission';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import {ActivityIndicator} from 'react-native-paper';
import axios from 'axios';
import {CetakETicket, CetakInvoice} from '../API/functionget';

const PesananSayaPayment = ({paymentStatus = [], token}) => {
  const [isloading, setIsloading] = useState(null);

  const generatePDFH = async (index, value) => {
    console.log(value);
    try {
      // await axios.get()
      setIsloading(index);
      const html = `
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Static Template</title>
        <style>
          .template {
            max-width: 900px;
          }
          .text1 {
            color: black;
            font-weight: 900;
            margin-top: 30px;
          }
          .text2 {
            color: #343434;
          }
          img {
            width: 100px;
            background-size: cover;
          }
          body {
            font-family: "Franklin Gothic Medium", "Arial Narrow", Arial, sans-serif;
            padding: 10px;
          }

          table,
          th,
          td {
            border: 1px solid gray;
            border-collapse: collapse;
            text-align: left;

            color: #343434;
            padding: 6px;
          }
        </style>
      </head>

      <body>
        <div class="template">
          <div>
            <img
              src="https://omtek.sgp1.cdn.digitaloceanspaces.com/cektravel/public/branding/cek-travek-logo100x.png"
            />
            <p class="text1">CekTravel.com</p>
            <p class="text2">Nomor Invoice: ${value.invoice_number}</p>
          </div>

          <div style="margin-top: 30px;">
            <p>Diterbitkan atas nama :</p>
            <p class="text2">Hotel : ${value.hotel_name}</p>
            <p class="text2">Tanggal : ${value.transaction_date}</p>
          </div>

          <div style="margin-top: 30px; margin-bottom: 20px;">
            <p>Ditagihkan kepada</p>
            <p class="text2">Nama : ${value.holder_name}</p>
            <p class="text2">Email : ${value.holder_email}</p>
          </div>

          <table style="width: 100%;">
<tr>
  <th>
    Nama Kamar
  </th>
  <th>Jumlah</th>
  <th>Harga Permalam</th>
  <th>Sub Total</th>
</tr>
          ${value.rooms.map(
            (val, index) => `
            <tr>
              <td>${val.room_name}</td>
              <td>${val.total}</td>
              <td>${formatter(val.price)}</td>
              <td>${formatter(val.sub_total)}</td>
            </tr>
          `,
          )}
            <tr>
              <td colspan="2"></td>
              <td>Subtotal Harga</td>
              <td>${formatter(value.base_price)}</td>
            </tr>
          </table>

          <div
            style="
              margin-top: 50px;
              width: 100%;
              display: flex;
              align-items: flex-end;
              flex-direction: column;
            "
          >
            <div>
              <p class="text1">Pajak: ${formatter(value.tax)}</p>
              <p class="text1">Total Pembayaran: ${formatter(
                value.final_price,
              )}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
      `;
      const options = {
        html,
        fileName: `invoice_cektravel ${JSON.stringify(new Date().getTime())}`,
        directory: 'Invoices',
      };
      const file = await RNHTMLtoPDF.convert(options);
      alert('Success' + `PDF saved to ${file.filePath}`);
      setIsloading(null);
    } catch (error) {
      // alert('Error', error.message);
      console.log(error);
      setIsloading(null);
    }
  };

  const generateEtiket = async (index, value) => {
    console.log(value, 'eticket');
    try {
      // await axios.get()
      setIsloading(index);
      const html = `
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="X-UA-Compatible" content="ie=edge" />
          <title>Static Template</title>
        </head>
        <body>
          <h1>E-Ticket Cek Travel</h1>
          <h3 style="color: #f05907;">Kode Booking : ${value.booking_code}</h3>
      
          <h3>${value.hotel.name}</h3>
          <p>
          ${value.hotel.address}
          </p>
          <div style="display: flex; width: 100%;">
            <div style="border: 1px solid orange; width: 50%; padding: 10px;">
              <p>Check In</p>
              <p>${value.checkin_date}</p>
              <p>${value.checkin_time}</p>
            </div>
            <div style="border: 1px solid orange; width: 50%; padding: 10px;">
              <p>Check Out</p>
              <p>${value.checkout_date}</p>
              <p>${value.checkout_time}</p>
            </div>
          </div>
          <div>
            <h3>Booking Details:</h3>
            <div style="display: flex; justify-content: space-between;">
              <div>
                <h4>Kamar:</h4>
                <p>Total Kamar:${value.total_rooms}</p>
                <p>Tipe Kamar:${value.rooms}</p>
              </div>
              <div>
                <h4>Addons:</h4>
                <p>-</p>
                <p>-</p>
              </div>
            </div>
          </div>
          <div style="display: flex; justify-content: space-between;">
            <div style="display: flex; flex-direction: column; align-items: center;">
              <p>Customer Service</p>
              <p>087788121312</p>
            </div>
            <div style="display: flex; flex-direction: column; align-items: center;">
              <p>Customer Service Email</p>
              <p>cs@cektravel.com</p>
            </div>
          </div>
        </body>
      </html>
      `;
      const options = {
        html,
        fileName: `E-ticket_cektravel ${JSON.stringify(new Date().getTime())}`,
        directory: 'Invoices',
      };
      const file = await RNHTMLtoPDF.convert(options);
      alert('Success' + `PDF saved to ${file.filePath}`);
      setIsloading(null);
    } catch (error) {
      // alert('Error', error.message);
      console.log(error);
      setIsloading(null);
    }
  };

  // console.log(token);
  return paymentStatus.length === 0 ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>Belum ada Pemesanan</Text>
    </View>
  ) : (
    <FlatList
      data={paymentStatus}
      contentContainerStyle={{paddingBottom: adjust(40)}}
      showsVerticalScrollIndicator={false}
      renderItem={({item, index}) => {
        // console.log(item);
        return (
          <View
            style={{
              borderWidth: 1,
              padding: adjust(5),
              marginVertical: adjust(5),
              borderColor: GrayBold,
              borderRadius: adjust(5),
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                {item.hotel.name}
              </Text>
              <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                {item.total_adult + item.total_child} tamu
              </Text>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginVertical: adjust(5),
              }}>
              <View>
                <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                  Tanggal
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {item.checkin}
                </Text>
              </View>
              <View>
                <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                  Booking Code
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {item.booking_code}
                </Text>
              </View>
              <View>
                <Text style={{color: GrayBold, fontSize: adjust(10)}}>
                  Total Bayar
                </Text>
                <Text style={{color: GrayFade, fontSize: adjust(9)}}>
                  {formatter(item.final_price)}
                </Text>
              </View>
            </View>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              {isloading === index ? (
                <ActivityIndicator size={adjust(10)} color={Oranges} />
              ) : (
                <Pressable
                  style={{
                    display: 'flex',
                    padding: adjust(10),
                  }}
                  onPress={() =>
                    PermisionStorage(() =>
                      CetakInvoice(item.id, token, val =>
                        generatePDFH(index, val),
                      ),
                    )
                  }>
                  <Text
                    style={{
                      color: Oranges,
                      fontSize: adjust(10),
                      marginHorizontal: adjust(5),
                    }}>
                    Cetak Invoice
                  </Text>
                </Pressable>
              )}

              <TouchableOpacity
                onPress={() =>
                  PermisionStorage(() =>
                    CetakETicket(item.id, token, val =>
                      generateEtiket(index, val),
                    ),
                  )
                }
                style={{
                  backgroundColor: Oranges,
                  padding: adjust(5),
                  borderRadius: adjust(5),
                }}>
                <Text style={{color: 'white', fontSize: adjust(10)}}>
                  Cetak e-Ticket
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        );
      }}
      keyExtractor={(item, index) => {
        // console.log(index);
        return index;
      }}
    />
  );
};

export default React.memo(PesananSayaPayment);
