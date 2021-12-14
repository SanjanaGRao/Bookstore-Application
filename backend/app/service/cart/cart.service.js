const Cart = require("../../model/cart/cart.model");
const { findABook } = require("../books/book.service");
const logger = require("../../../config/logger");

class cartService {
  getCart = async (userId) => {
    let cart;
    try {
      cart = await Cart.find({ userId: userId });
    } catch (err) {
      logger.error(err);
    }
    if (cart && cart[0].items.length > 0) {
      return cart;
    } else {
      return null;
    }
  };
  addToCart = async (userId, productId, quantity) => {
    let item;
    let cart;
    try {
      cart = await Cart.find({ userId: userId });
    } catch (err) {
       logger.error(err);
    }
    try {
      item = await findABook(productId);
    } catch (err) {
      logger.error(err);
      return "Item not found";
    }

    const price = item.price;
    const name = item.title;
    const author = item.author;
    const image = item.image;
    if (cart.length != 0) {
      // if cart exists for the user
      let itemIndex = cart[0].items.findIndex((p) => p.productId == productId);
      // Check if product exists or not
      if (itemIndex > -1) {
        let productItem = cart[0].items[itemIndex];
        productItem.quantity += quantity;
        cart[0].items[itemIndex] = productItem;
      } else {
        cart[0].items.push({
          productId,
          name,
          author,
          quantity,
          price,
          image,
        });
      }
      cart[0].bill += quantity * price;
      cart[0] = cart[0].save();
      return cart[0];
    } else {
      // no cart exists, create one
      const newCart = Cart.create({
        userId,
        items: [
          {
            productId,
            name,
            author,
            quantity,
            price,
            image,
          },
        ],
        bill: quantity * price,
      });
      return newCart;
    }
  };
  deleteProduct = async (userId, productId) => {
    let cart;
    try {
      cart = await Cart.find({ userId: userId });
    } catch (err) {
        logger.error(err);
    }
    let itemIndex = cart[0].items.findIndex((p) => p.productId == productId);
    if (itemIndex > -1) {
      let productItem = cart[0].items[itemIndex];
      cart[0].bill -= productItem.quantity * productItem.price;
      cart[0].items.splice(itemIndex, 1);
    }
    cart = await cart[0].save();
    return cart;
  };
  deleteCart= async(userId) => {
    let cart;
    try {
        cart = await Cart.find({userId: userId});
    } catch (err) {
        console.log(err);
        logger.error(err);
    }
    await cart[0].delete();
    return ("Successfully deleted")
  };
}
module.exports = new cartService();
