import { Component, createFactory, PropTypes } from 'react';
import { blockFactory } from 'rebem';

const Block = blockFactory('cart-page');

class CartPage extends Component{

    renderHeadColumns() {
            const { items } = this.props;
    
            return [
                Block({
                    mods: { order: '1st' },
                    elem: 'head-col',
                    tag: 'th'
                }, `${items.length} items`),
                Block({
                    mods: { order: '2nd' },
                    elem: 'head-col',
                    tag: 'th'
                }, ' '),
                Block({
                    mods: { order: '3rd' },
                    elem: 'head-col',
                    tag: 'th'
                }, 'Item Price'),
                Block({
                    mods: { order: '4th' },
                    elem: 'head-col',
                    tag: 'th'
                }, 'Quantity'),
                Block({
                    mods: { order: '5th' },
                    elem: 'head-col',
                    tag: 'th'
                }, ' ')
            ];
        }
        renderHeader() {
            return Block({
                elem: 'header',
                tag: 'thead'
            }, Block({
                elem: 'row',
                tag: 'tr'
            }, ...this.renderHeadColumns()));
        }
        renderBody() {
            const TBody = props => Block({
                elem: 'tbody',
                tag: 'tbody'
            }, props.children);
    
        }
        renderItems() {
            const { items } = this.props;
    
            return items.map((movie) => Block({
                elem: 'item',
                tag: 'tr',
                key: product.sku
            }, ...this.renderItem(movie)));
        }
        renderItem(movie) {
            const {
                no,
                title,
                total,
                quantity,
            } = movie;
    
            return [
                Block({
                    mods: { order: '1st' },
                    elem: 'col',
                    tag: 'td'
                }, 
                Block(
                    {
                        mods: { order: '2nd' },
                        elem: 'col',
                        tag: 'td'
                    },
                    MovieDescription({ no, title, quantity, total }),
                    Block({
                        elem: 'move-to-wishlist',
                        tag: 'a',
                        onClick: () => {
                            this.props.handleAddItemToWishlist(movie);
                        }
                    }, 'Move to wish list')
                ),
                ))
        }
        render() {
            return Block(
                {
                    tag: 'table'
                },
                this.renderHeader(),
                this.renderBody()
            );
        }
    }
    CartPage.displayName = 'CartPage';
    
    CartPage.defaultProps = {
        items: []
    };
    
    CartPage.propTypes = {
        items: PropTypes.arrayOf(
            PropTypes.shape({
                no: PropTypes.string.isRequired,
                title: PropTypes.string.isRequired,
                total: PropTypes.number.isRequired,
                quantity: PropTypes.number.isRequired,
            })
        ),
        handleRemoveItem: PropTypes.func.isRequired,
        handleAddItemToWishlist: PropTypes.func.isRequired
};

export default CartPage