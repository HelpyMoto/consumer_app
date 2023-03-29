import {ScrollView, StyleSheet, Text, View, Image} from 'react-native';
import React, {useState, useEffect} from 'react';
import {bookings} from '../../components/data/DATA';
import BookingView from '../../components/molecules/BookingView';

const CompletedBookings = () => {
  const [booking, setBooking] = useState([]);

  useEffect(() => {
    setBooking(
      bookings.filter(item => {
        return item.status === 'completed';
      }),
    );
  }, []);

  return (
    <ScrollView style={{backgroundColor:'#fff'}} >
      {booking.map(item => (
        <BookingView item={item} key={item.bookingId} />
      ))}
    </ScrollView>
  );
};

export default CompletedBookings;
