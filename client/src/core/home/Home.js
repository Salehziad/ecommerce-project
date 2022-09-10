import React, {useState, useEffect} from 'react';
import Layout from '../Layout';
import {getProducts} from '../apiCore';
import Card from '../card/Card';
import {Grid, Grow, Typography} from '@material-ui/core';
import Search from '../Search';

const Home = () => {

    const [productsByArrival,
        setProductsByArrival] = useState([]);
    const [error,
        setError] = useState(false);


    const loadProductsByArrival = () => {
        getProducts('createdAt').then(data => {
            if (data.error) {
                setError(data.error);
            } else {
                setProductsByArrival(data);
            }
        });
    };

    useEffect(() => {
        loadProductsByArrival();
    }, []);

    return (
        <Layout
            title="FullStack React Node MongoDB Ecommerce App"
            description="Node React E-commerce App"
            className="container-fluid">
            <Search/>
            <h2 className="mb-4">New Arrivals</h2>
            <Grow in>
                <Grid
                    style={{
                        padding: '0 5%',
                        width: '100%',
                        margin: 0
                }}
                    container
                    alignItems="stretch"
                    spacing={3}>
                    {productsByArrival.map((product, i) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            lg={4}
                            style={{
                            display: 'flex'
                        }}
                            key={i}>
                            <Card product={product} i={i}/>
                        </Grid>
                    ))}
                </Grid>
            </Grow>
        </Layout>
    );
};

export default Home;
