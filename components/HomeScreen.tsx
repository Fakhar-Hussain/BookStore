import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import StarRating from 'react-native-star-rating';
import {useSelector} from 'react-redux';

export default function HomeScreen(props: any) {
  const StoreBooksData = useSelector((state: any) => state.book);
  const {navigation} = props;

  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState(StoreBooksData);

  const [loader, setLoader] = useState(true);
  const [record, setRecord] = useState(false);

  const SearchBar = (text: any) => {
    let data = StoreBooksData.filter((item: any) => {
      return item.title.toLowerCase().indexOf(text.toLowerCase()) > -1;
    });
    if (data == '') {
      setRecord(true);
    } else {
      setRecord(false);
    }

    if (text) {
      let filteredList = StoreBooksData.filter((item: any) => {
        return item.title.toLowerCase().includes(text.toLowerCase());
      });
      const dataArray = [];
      dataArray.push(...filteredList); 

      let numColumns = 2;
      let totalRows = Math.floor(dataArray.length / numColumns);
      let LastRow = dataArray.length - totalRows * numColumns; 

      while (LastRow !== 0 && LastRow !== numColumns) {
        dataArray.push({title: `block-${LastRow}`, empty: true});
        LastRow++;
      }
      setFilterData(dataArray);
    } else {
      setFilterData(StoreBooksData);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      {/* Header */}
      <View style={styles.headerView}>
        <Text style={styles.headerText}>Hi Nick</Text>
        <Image
          source={require('../assets/images/user.png')}
          resizeMode="cover"
          style={styles.headerImg}
        />
      </View>

      {/* SearchBar */}
      <View style={styles.searchBarView}>
        <Icon
          name="search"
          size={24}
          color="darkgrey"
          style={styles.searchBarIcon}
        />
        <TextInput
          placeholder="Search..."
          placeholderTextColor={'grey'}
          style={styles.searchBarInput}
          value={search}
          onChangeText={text => {
            setSearch(text);
            SearchBar(text);
          }}
        />
      </View>

      {/* List of Items */}
      <View style={styles.booksListView}>
        {loader ? (
          <View style={styles.loaderView}>
            <ActivityIndicator size={45} color={'#004d6d'} />
            <Text style={styles.loaderTxt}>Please wait</Text>
          </View>
        ) : record ? (
          <View
            style={{
              alignSelf: 'center',
              margin: 60,
            }}>
            <Image
              source={require('../assets/images/record.png')}
              resizeMode="contain"
              style={{width: 250, height: 250}}
            />
          </View>
        ) : (
          <FlatList
            data={filterData}
            columnWrapperStyle={{justifyContent: 'space-evenly',}}
            numColumns={2}
            renderItem={({item, index}: any) => {

              if (item.empty === true) {
                return <View style={{
                  width: 166,
                  marginBottom: "8%",
                  paddingHorizontal:"3%",
                }} />
              }

              return (
                <TouchableOpacity
                  style={styles.bookContainer}
                  onPress={() => navigation.navigate('Book', {data: item})}>
                  {/* Book Image */}
                  <Image
                    source={{uri: item.imageLink}}
                    resizeMode="cover"
                    style={styles.bookImage}
                  />

                  {/* Heart Container */}
                  <TouchableOpacity style={styles.bookHeartContainer}>
                    <Icon
                      name={item.is_liked ? 'heart' : 'heart-o'}
                      size={18}
                      color="red"
                    />
                  </TouchableOpacity>

                  {/* Book Title */}
                  <Text style={styles.bookTitle}>
                    {item.title.length <= 17
                      ? item.title
                      : item.title.slice(0, 17) + '...'}
                  </Text>

                  {/* Ratings */}
                  <View style={styles.bookRatingContainer}>
                    <StarRating
                      disabled={true}
                      maxStars={5}
                      starSize={22}
                      rating={item.rating}
                      fullStarColor="orange"
                      emptyStarColor="lightgrey"
                      starStyle={styles.bookRatingStar}
                    />
                    <Text style={styles.bookReview}>({item.reviews})</Text>
                  </View>

                  {/* Book Price */}
                  <Text style={styles.bookPrice}>$ {item.price}</Text>
                </TouchableOpacity>
              );
            }}
          />
        )}
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
    flex: 0.15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerImg: {
    width: 57,
    height: 57,
    borderRadius: 30,
    marginRight: 20,
  },
  headerText: {
    fontSize: 20,
    fontFamily: 'Ubuntu-Medium',
    marginLeft: 20,
    color: '#000',
  },

  // SearchBar
  searchBarView: {
    flex: 0.1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBarInput: {
    backgroundColor: '#f1f1f1',
    width: '92%',
    height: 45,
    borderRadius: 25,
    paddingLeft: 50,
    fontSize: 16,
  },
  searchBarIcon: {
    position: 'absolute',
    zIndex: 2,
    alignSelf: 'flex-start',
    left: 30,
  },
  // Loader
  loaderView: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 14,
    marginTop: 120,
  },
  loaderTxt: {
    fontFamily: 'Poppins-Medium',
    color: '#004d6d',
    fontSize: 13,
    marginTop: 10,
  },

  // BooksList
  booksListView: {
    flex: 0.75,
  },
  bookContainer: {
    width: '46%',
    height: 320,
    marginTop: 10,
  },
  bookImage: {
    width: '90%',
    height: '70%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 10,
  },
  bookHeartContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginTop: 5,
    marginLeft: 12,
    lineHeight: 22,
  },
  bookRatingContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  bookRatingStar: {
    marginLeft: 2,
    marginVertical: 3,
  },
  bookReview: {
    fontSize: 14,
    fontFamily: 'Poppins-Regular',
    marginLeft: 7,
    marginTop: 6,
    color: 'gray',
  },
  bookPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginLeft: 12,
  },
});
