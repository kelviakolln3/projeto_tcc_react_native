import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../../../actions/custumersLoadAction';

const CustumerLoad = () => {
    const state = useSelector((state) => state);
    //console.log(state);  // Check the entire state structure
    const dispatch = useDispatch();
    const { loading, list: data, error } = useSelector((state) => state.custumers || { loading: false, list: [], error: null });

    useEffect(() => {
        dispatch(fetchData());
    }, [dispatch]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error: {error}</Text>;
    }

    return (
        <FlatList
            data={data}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <Text>{item.name}</Text>}
        />
    );
};

export default CustumerLoad;