import React, {Component} from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    bacon:0.9,
    meat:0.6
};
const BASE_PRICE = 1;
class BurgerBuilder extends Component { 
    state = {
        ingredients: {
            salad: 0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: BASE_PRICE,
        purchasable: false
    }

    addIngrdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        const purchasableFlg = newPrice > BASE_PRICE;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients, purchasable: purchasableFlg})

    }

    removeIngrdientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceDeuction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeuction;
        const purchasableFlg = newPrice > BASE_PRICE;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients, purchasable: purchasableFlg})

    }

    updatePurchaseState(){

    }
    render () {
        const disabledInfo = {
            ...this.state.ingredients
        }
        for(let key in disabledInfo){
            disabledInfo[key]= disabledInfo[key] <=0
        }
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients} />
                <BuildControls 
                    ingredientAdded={this.addIngrdientHandler}
                    ingredientRemoved = {this.removeIngrdientHandler}
                    disabled = {disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;