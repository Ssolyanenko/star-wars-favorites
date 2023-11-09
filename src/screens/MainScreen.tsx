import React, {useEffect, useState} from 'react';
import {FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {fetchCharacterData, fetchSpeciesData} from "../store/slices/populationSlice";
import {Loader} from "../components/Loader";

const MainScreen = ({navigation}: any) => {
    const dispatch = useDispatch();
    // @ts-ignore
    const {data, isLoading, speciesData} = useSelector((state) => state.characters);
    const [page, setPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [favoriteCharacters, setFavoriteCharacters] = useState([]);
    const [maleCount, setMaleCount] = useState(0);
    const [femaleCount, setFemaleCount] = useState(0);
    const [otherCount, setOtherCount] = useState(0);

    useEffect(() => {
        // @ts-ignore
        dispatch(fetchCharacterData(page));
    }, [page]);

    useEffect(() => {
        data.forEach((character: any) => {
            if (character.species.length > 0 && !speciesData[character.url]) {
                // @ts-ignore
                dispatch(fetchSpeciesData(character.species[0], character.url));
            }
        });
    }, [page]);


    const getSpeciesName = (speciesUrl: any) => {
        if (speciesData[speciesUrl]) {
            return speciesData[speciesUrl].name;
        }
        return '';
    };

    const handlePageClick = (p: any) => {
        setCurrentPage(p);
        setPage(p);
    };

    const handleAddToFavorites = (character: any) => {
        const index = favoriteCharacters.findIndex((fav: any) => fav.name === character.name);

        if (index === -1) {
            const updatedFavoriteCharacters = [...favoriteCharacters, character];
            // @ts-ignore
            setFavoriteCharacters(updatedFavoriteCharacters);
            if (character.gender === 'male') {
                setMaleCount(maleCount + 1);
            } else if (character.gender === 'female') {
                setFemaleCount(femaleCount + 1);
            } else {
                setOtherCount(otherCount + 1);
            }
        } else {
            const updatedFavoriteCharacters = favoriteCharacters.filter((fav: any) => fav.name !== character.name);
            setFavoriteCharacters(updatedFavoriteCharacters);
            if (character.gender === 'male') {
                setMaleCount(maleCount - 1);
            } else if (character.gender === 'female') {
                setFemaleCount(femaleCount - 1);
            } else {
                setOtherCount(otherCount - 1);
            }
        }
    };
    const handleReset = () => {
        setFavoriteCharacters([]);
        setMaleCount(0);
        setFemaleCount(0);
        setOtherCount(0);
    };
    const isFavorited = (character: any) => {
        // @ts-ignore
        return favoriteCharacters.some((fav) => fav.name === character.name);
    };
    const renderCharacter = ({item}: any) => (
        <TouchableOpacity onPress={() => navigation.navigate('Details', {character: item})}>
            <View style={styles.characterContainer}>
                <Text style={styles.text}>Name: {item.name}</Text>
                <Text style={styles.text}>Birth Year: {item.birth_year}</Text>
                <Text style={styles.text}>Gender: {item.gender}</Text>
                <Text style={styles.text}>Home World: {item.homeworld}</Text>
                <Text style={styles.text}>Species: {getSpeciesName(item.species[0])}</Text>
                <TouchableOpacity onPress={() => handleAddToFavorites(item)}>
                    <Text style={{
                        color: isFavorited(item) ? 'red' : 'green',
                        fontWeight: 'bold',
                        textAlign: 'center',
                        marginVertical: 10
                    }}>{isFavorited(item) ? "Remove from favorite" : "Add to favorite"}</Text>
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    );


    const renderPaginationButtons = () => {
        const buttons = [];

        if (currentPage) {
            buttons.push(
                <TouchableOpacity
                    key="back"
                    onPress={() => handlePageClick(currentPage - 1)}
                    style={styles.paginationButton}
                >
                    <Text style={{color: '#003459'}}>{`<`}</Text>
                </TouchableOpacity>
            );
        }

        if (currentPage) {
            buttons.push(
                <TouchableOpacity
                    key="forward"
                    onPress={() => handlePageClick(currentPage + 1)}
                    style={styles.paginationButton}
                >
                    <Text style={{color: '#003459'}}>{`>`}</Text>
                </TouchableOpacity>
            );
        }

        return buttons;
    };
    if (isLoading) return <Loader/>
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.statsContainer}>
                <Text style={styles.textFan}>Males: {maleCount}</Text>
                <Text style={styles.textFan}>Females: {femaleCount}</Text>
                <Text style={styles.textFan}>Others: {otherCount}</Text>
                <TouchableOpacity hitSlop={35} onPress={() => handleReset()}>
                    <Text style={{color: 'red', fontWeight: 'bold'}}>Reset</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={data}
                keyExtractor={(item) => item.name}
                renderItem={renderCharacter}
                windowSize={10}
            />
            <View style={styles.paginationContainer}>{renderPaginationButtons()}</View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    text: {
        fontWeight: 'bold',
        color: '#000'
    },
    statsContainer: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        marginBottom: 5,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    characterContainer: {
        marginBottom: 5,
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#ccc',
        backgroundColor: 'white',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
        backgroundColor: '#003459',
    },
    paginationButton: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 40,
        height: 40,
        borderRadius: 20,
        marginHorizontal: 4,
        backgroundColor: 'white',
    },
    textFan: {
        fontWeight: 'bold',
        color: '#003459'
    }
});

export default MainScreen;
