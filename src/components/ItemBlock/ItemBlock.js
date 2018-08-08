import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    item: PropTypes.shape({
        id: PropTypes.string,
    }).isRequired,
}

class ItemBlock extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
        }
    }

    render () {
        const { id } = this.props.item

        return (
            <div className={'item-wrapper'}>
                <div className={'item-id'} contentEditable={false}>
                    {id}
                </div>
                <div className={'item-body'}>
                    {this.props.children}
                </div>
            </div>
        )
    }

}

ItemBlock.propTypes = propTypes

export default ItemBlock