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
import axios from 'axios';
import books from '../assets/books';

const HomeScreen = (props: any) => {
  // const StoreBooksData = useSelector((state: any) => state.book);
  const {navigation} = props;
  const [search, setSearch] = useState('');
  const [filterData, setFilterData] = useState(books);

  const [loader, setLoader] = useState(true);
  const [listLoading, setListLoading] = useState(false);
  const [recordNotFound, setRecordNotFound] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [Data, setData] = useState<any>([]);





  const SearchBar = (searchText: any) => {
    
    if (searchText) {
      let filteredList = books.filter((item: any) => {
        return item.title.toLowerCase().includes(searchText.toLowerCase());
      });

      
      if (filteredList.length > 0) {
        setRecordNotFound(false);
        const dataArray: any = [];
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
        setRecordNotFound(true);
      }
      

    } else {
      setFilterData(books);      
    }
  };




  const DataFetch = async () => {
    setListLoading(true)

    let newDataResponse = books;
    
    try {
      let maxItemsPerPage = 20;

      let FetchLimit = (data:any , page: any , itemsPerPage: any) => {
        let startIndex = (page - 1) * itemsPerPage;
        let endIndex = startIndex + itemsPerPage;
        return data.slice(startIndex, endIndex)
      }

      let FetchLimitResponse = FetchLimit(newDataResponse, currentPage, maxItemsPerPage)
      setData([...Data, ...FetchLimitResponse])
      setCurrentPage(currentPage + 1);

    } catch (error) {
      console.log("Data Fetch: ", error);
    } finally {
      setTimeout(() => {
        setListLoading(false);
      }, 600);
    }

  };



  useEffect(() => {
    DataFetch();
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
        ) : recordNotFound ? (
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
          <>
          <FlatList
            data={search ? filterData : Data}
            columnWrapperStyle={{justifyContent: 'space-evenly'}}
            numColumns={2}
            onEndReached={DataFetch}
            onEndReachedThreshold={1}
            renderItem={({item, index}: any) => {

              let rating = Math.floor(item.pages/120);
              let review = Math.floor(item.pages/20);
              let price = Math.floor(item.pages/3);
              
              if (item.empty === true) {
                return (
                  <View
                    style={{
                      width: 166,
                      marginBottom: '8%',
                      paddingHorizontal: '3%',
                    }}
                  />
                );
              }

              return (
                <TouchableOpacity
                  style={styles.bookContainer}
                  onPress={() => navigation.navigate('Book', {data: item})}>
                  {/* Book Image */}
                  <Image
                    source={item.image}
                    resizeMode="cover"
                    style={styles.bookImage}
                  />

                  {/* Heart Container */}
                  <TouchableOpacity style={styles.bookHeartContainer}>
                    <Icon
                      name={item.pages < 300 ? 'heart' : 'heart-o'}
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
                      starSize={19}
                      rating={rating}
                      fullStarColor="orange"
                      emptyStarColor="lightgrey"
                      starStyle={styles.bookRatingStar}
                    />
                    <Text style={styles.bookReview}>({review})</Text>
                  </View>

                  {/* Book Price */}
                  <Text style={styles.bookPrice}>$ {price}.00</Text>
                </TouchableOpacity>
              );
            }}
            ListFooterComponent={() =>
              listLoading && (
                <ActivityIndicator size={"large"} color="#004d6d" style={{marginVertical:10, position: "absolute", bottom: 10, alignSelf: "center"}} />
              )
            }

            ListFooterComponentStyle={{height: 60,width: "100%",zIndex: 2}}
            
          />
          
        </>
        )}
      </View>
    </View>
  );
}


export default HomeScreen;


    // let response = await axios.get('https://books-list-api.vercel.app/books', {
    //   headers: {
    //     Accept: 'application/json',
    //     'Content-Type': 'application/json',
    //     'x-api-key': '#b0@6hX8YasCq6^unOaPw1tqR',
    //   },
    // });

    // {/* {listLoading && (
    //     <ActivityIndicator size={"large"} color="#004d6d" style={{marginVertical:10, position: "absolute", bottom: 10, alignSelf: "center"}} />
    //   )} */}



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
    height: 50,
    borderRadius: 25,
    paddingLeft: 50,
    fontSize: 18,
    fontFamily: 'Ubuntu-Medium',
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
    fontSize: 12,
    fontFamily: 'Poppins-Regular',
    marginLeft: 7,
    marginTop: 4,
    color: '#3e3e3e',
  },
  bookPrice: {
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
    color: '#000',
    marginLeft: 12,
  },
});
