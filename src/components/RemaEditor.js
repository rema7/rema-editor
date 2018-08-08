import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import ItemBlock from './ItemBlock/ItemBlock'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                ],
            },
        ],
    },
})

class RemaEditor extends React.Component {
    constructor (props) {
        super(props)

        let items = []
        for (let i=0; i<10; i++) {
            items.push({
                id: 'xxx-' + i,
            })
        }

        this.state = {
            value: initialValue,
            items,
        }
    }

    onKeyDown(event, change) {

        // const { value } = change

        if (event.key === 'Enter') {
            event.preventDefault()

            change.splitBlock().setBlocks({
                type: 'item',
                data: {
                    item: this.state.items[0],
                },
            })
            return true
        }
    }

    onChange({value}) {
        this.setState({value})
    }

    render () {
        return (
            <div>
                <h1> RemaEditor </h1>
                <Editor
                    placeholder="Get to work..."
                    value={this.state.value}
                    onChange={::this.onChange}
                    onKeyDown={::this.onKeyDown}
                    renderNode={::this.renderNode}
                />
            </div>
        )
    }

    renderNode(props) {
        const { attributes, node, isFocused } = props

        switch(props.node.type) {
            case 'code': {
                return (
                    <h1 {...props.attributes}>
                        <code>{props.children}</code>
                    </h1>
                )
            }
            case 'item': {
                const item = node.data.get('item')

                return (
                    <ItemBlock {...props} item={item} {...attributes}/>
                )
            }
        }
    }

}

export default RemaEditor