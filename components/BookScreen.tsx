import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinkIcon from 'react-native-vector-icons/Feather';

export default function BookScreen(props: any) {
  const {height, width} = Dimensions.get('window');
  const {navigation , route} = props;

  let item = route.params.data
  
  return (
    <View style={styles.container}>
      <StatusBar hidden />

      {/* Details */}
      <View style={styles.detailsView}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{maxHeight: '100%'}}>

          {/* Header */}
          <View style={styles.headerView}>
            <TouchableOpacity
              style={styles.headerIcon}
              onPress={() => navigation.goBack()}>
              <Icon name="arrow-left" size={24} style={{color: '#000'}} />
            </TouchableOpacity>
          </View>

          {/* Book Card */}
          <View style={[styles.bookCardContainer, {height: width * 1.1}]}>
            <Image
              source={{uri: item.imageLink}}
              resizeMode="stretch"
              style={styles.bookImage}
            />
            <View style={styles.bookTextContainer}>
              {/* Rating */}
              <TouchableOpacity style={styles.bookTextView}>
                <Text style={[styles.bookText, {marginTop:-5}]}>Ratings</Text>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  starSize={16}
                  rating={item.rating}
                  fullStarColor="orange"
                  emptyStarColor="gray"
                  starStyle={{marginLeft: 2,marginVertical: 1}}
                />
              </TouchableOpacity>
              {/* Review */}
              <TouchableOpacity style={styles.bookTextView}>
                <Text style={styles.bookText}>Reviews</Text>
                <Text style={styles.bookTextTwo}>({item.reviews})</Text>
              </TouchableOpacity>
              {/* Price */}
              <TouchableOpacity style={styles.bookTextView}>
                <Text style={styles.bookText}>Price</Text>
                <Text style={styles.bookTextTwo}>$ {item.price}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Book Details */}
          <View style={styles.bookDetailsContainer}>
            {/* Book Title */}
            <Text style={styles.bookTitle}>{item.title}</Text>

            <View style={[styles.bookDetailsFirstView, {marginTop: 12}]}>
              <Text style={styles.bookDetailsFirstTxt}>Author:</Text>
              <Text style={styles.bookDetailsSecondTxt}>{item.author}</Text>
            </View>
            <View style={styles.bookDetailsFirstView}>
              <Text style={styles.bookDetailsFirstTxt}>Country:</Text>
              <Text style={styles.bookDetailsSecondTxt}>{item.country}</Text>
            </View>
            <View style={styles.bookDetailsFirstView}>
              <Text style={styles.bookDetailsFirstTxt}>Language:</Text>
              <Text style={styles.bookDetailsSecondTxt}>{item.language}</Text>
            </View>
            <View style={styles.bookDetailsFirstView}>
              <Text style={styles.bookDetailsFirstTxt}>Year:</Text>
              <Text style={styles.bookDetailsSecondTxt}>{item.year}</Text>
            </View>
            <View style={styles.bookDetailsFirstView}>
              <Text style={styles.bookDetailsFirstTxt}>Pages:</Text>
              <Text style={styles.bookDetailsSecondTxt}>{item.pages}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.viewDetailsBtn}>
            <Text style={styles.viewDetailsBtnTxt}>View Details</Text>
            <LinkIcon
              name="external-link"
              size={20}
              style={styles.viewDetailsBtnIcon}
            />
          </TouchableOpacity>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  headerView: {
    width: "85%",
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    marginVertical: 10,
    alignSelf: "center"
  },
  headerIcon: {
    position: 'absolute',
    // left: 20,
  },
  // Details
  detailsView: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Book Card
  bookCardContainer: {
    backgroundColor: '#fff',
    width: '85%',
    alignSelf: 'center',
    marginTop: 5,
    borderRadius: 8,
    elevation: 6,
    padding: 15,
  },
  bookImage: {
    width: '100%',
    height: '85%',
    borderRadius: 8,
    alignSelf: 'center',
  },
  bookTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 6,
  },
  bookTextView: {
    width: 85,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookText: {
    fontSize: 13,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  bookTextTwo: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: 'gray',
  },

  // Book Details
  bookDetailsContainer: {
    width: '85%',
    alignSelf: 'center',
    marginTop: 20,
    marginLeft: 8,
  },
  bookTitle: {
    fontSize: 20,
    fontFamily: 'Poppins-Medium',
    color: '#000',
  },
  bookDetailsFirstView: {
    flexDirection: 'row',
  },
  bookDetailsFirstTxt: {
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
  },
  bookDetailsSecondTxt: {
    marginLeft: 8,
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    color: '#000',
  },

  viewDetailsBtn: {
    backgroundColor: '#004d6d',
    width: '85%',
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 25,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  viewDetailsBtnTxt: {
    color: '#fff',
    fontFamily: 'Poppins-Medium',
  },
  viewDetailsBtnIcon: {
    color: '#fff',
    marginLeft: 7,
    bottom: 3,
  },
});
