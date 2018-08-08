import React from 'react'
import PropTypes from 'prop-types'

const propTypes = {
    node: PropTypes.object.isRequired,
    children: PropTypes.node,
}

class ItemBlock extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
        }
    }

    render () {
        const { node } = this.props
        const id = node.data.get('id')


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