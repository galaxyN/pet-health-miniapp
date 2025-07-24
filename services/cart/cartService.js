/**
 * 购物车服务
 */

// 获取购物车数据
export function getCart() {
  return wx.getStorageSync('cart') || [];
}

// 保存购物车数据
export function saveCart(cart) {
  wx.setStorageSync('cart', cart);
}

// 添加商品到购物车
export function addToCart(goods) {
  const cart = getCart();
  const existingIndex = cart.findIndex(item => 
    item.id === goods.id && item.spec === goods.spec
  );
  
  if (existingIndex > -1) {
    cart[existingIndex].quantity += goods.quantity;
  } else {
    cart.push({
      ...goods,
      selected: true
    });
  }
  
  saveCart(cart);
  return cart;
}

// 更新商品数量
export function updateQuantity(id, spec, quantity) {
  const cart = getCart();
  const itemIndex = cart.findIndex(item => item.id === id && item.spec === spec);
  
  if (itemIndex > -1) {
    if (quantity <= 0) {
      cart.splice(itemIndex, 1);
    } else {
      cart[itemIndex].quantity = quantity;
    }
    saveCart(cart);
  }
  
  return cart;
}

// 删除商品
export function removeFromCart(id, spec) {
  const cart = getCart();
  const filteredCart = cart.filter(item => !(item.id === id && item.spec === spec));
  saveCart(filteredCart);
  return filteredCart;
}

// 清空购物车
export function clearCart() {
  saveCart([]);
  return [];
}

// 获取选中商品
export function getSelectedItems() {
  const cart = getCart();
  return cart.filter(item => item.selected);
}

// 获取购物车统计信息
export function getCartStats() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  
  return {
    totalCount,
    totalAmount,
    itemCount: cart.length
  };
}