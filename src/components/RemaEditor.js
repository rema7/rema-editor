import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'
import ItemBlock from './ItemBlock/ItemBlock'

const initialValue = {
    document: {
        nodes: [
            {
                object:'block',
                type:'item',
                isVoid:false,
                data: {
                    id: 'XXX-??',
                },
                nodes: [

                ],
            },
        ],
    },
}

const existingValue = JSON.parse(localStorage.getItem('content'))
const currentValue = Value.fromJSON(existingValue || initialValue)

class RemaEditor extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            value: currentValue,
        }
    }

    componentDidMount () {
    }

    onKeyDown (event, change) {

        // const { value } = change

        if (event.key === 'Enter') {
            event.preventDefault()

            change.splitBlock().setBlocks({
                type: 'item',
                data: {
                    id: 'XXX-??',
                },
            }).focus()

            return true
        }
    }

    onChange ({value}) {
        if (value.document !== this.state.value.document) {
            const content = JSON.stringify(value.toJSON())
            localStorage.setItem('content', content)
        }
        this.setState({value})
    }

    render () {
        return (
            <div>
                <h1> RemaEditor </h1>
                <Editor
                    value={this.state.value}
                    onChange={::this.onChange}
                    onKeyDown={::this.onKeyDown}
                    renderNode={::this.renderNode}
                />
            </div>
        )
    }

    renderNode (props) {
        const {attributes} = props

        switch (props.node.type) {
            case 'code': {
                return (
                    <h1 {...props.attributes}>
                        <code>{props.children}</code>
                    </h1>
                )
            }
            case 'item': {
                return (
                    <ItemBlock {...props} {...attributes}/>
                )
            }
        }
    }

}

export default RemaEditor