import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {
    Card,
    CardActions,
    CardActionArea,
    CardContent,
    CardMedia,
    Button,
    Typography,
} from '@material-ui/core';
import UseStyles from './styles';
import {addItem, updateItem, removeItem} from '../cartHelpers';

const Cards = ({
    product,
    setRun = f => f,
    run = undefined
}) => {
    const classes = UseStyles();
    const [redirect,
        setRedirect] = useState(false);
    const [count,
        setCount] = useState(product.count);

    const addToCart = () => {
        addItem(product, setRedirect(true));
    };

    const showStock = quantity => {
        return quantity > 0
            ? (
                <span className="badge badge-primary badge-pill">In Stock
                </span>
            )
            : (
                <span className="badge badge-primary badge-pill">Out of Stock
                </span>
            );
    };

    const handleChange = productId => event => {
        setRun(!run);
        setCount(event.target.value < 1
            ? 1
            : event.target.value);
        if (event.target.value >= 1) {
            updateItem(productId, event.target.value);
        }
    };

    const showCartUpdateOptions = cartUpdate => {
        return (cartUpdate && (
            <div>
                <div className="input-group mb-3">
                    <div className="input-group-prepend">
                        <span className="input-group-text">Adjust Quantity</span>
                    </div>
                    <input
                        type="number"
                        className="form-control"
                        value={count}
                        onChange={handleChange(product._id)}/>
                </div>
            </div>
        ));
    };

    return (
            <Card className={classes.card}>
                <CardActionArea target='_blank'>
                    <CardMedia
                        className={classes.media}
                        image={product.photo || 'https://www.industry.gov.au/sites/default/files/August%202018/image/news-placeho' +
                        'lder-738.png'}/>
                    <div className={classes.details}>
                        <Typography variant='body2' color='textSecondary' componentt='h2'>{product.name}</Typography>
                        <Typography variant='body2' color='textSecondary' componentt='h2'>${product.price}</Typography>
                    </div>
                    <Typography className={classes.title} gutterBottom variant='h5'>Category: {product.category && product.category.name}</Typography>
                    <CardContent>
                        <Typography variant='body2' color='textSecondary' componentt='p'>
                            Added on {moment(product.createdAt).fromNow()}
                        </Typography>
                        <Typography variant='body2' color='textSecondary' componentt='p'>
                            {showStock(product.quantity)}
                        </Typography>
                    </CardContent>
                </CardActionArea>
                <CardActions className={classes.cardActions}>
                    <Button size='small' color='primary'>
                        <Link to={`/product/${product._id}`}>View Product
                        </Link>
                    </Button>
                    <Button size='small' color='primary' onClick={addToCart}>
                        Add to cart
                    </Button>
                    <Button
                        size='small'
                        color='primary'
                        onClick={() => {
                        removeItem(product._id);
                        setRun(!run);
                    }}>
                        Remove Product
                    </Button>
                    {showCartUpdateOptions()}
                </CardActions>
            </Card>
    );
};

export default Cards;
