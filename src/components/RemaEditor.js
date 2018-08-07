import React from 'react'
import { Editor } from 'slate-react'
import { Value } from 'slate'

const initialValue = Value.fromJSON({
    document: {
        nodes: [
            {
                object: 'block',
                type: 'paragraph',
                nodes: [
                    {
                        object: 'text',
                        leaves: [
                            {
                                text: 'A line of text in a paragraph.',
                            },
                        ],
                    },
                ],
            },
        ],
    },
})

class RemaEditor extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            value: initialValue,
        }
    }

    onChange ({value}) {
        this.setState({value})
    }

    render () {
        return (
            <div>
                <h1> XXX123 </h1>
                <Editor
                    value={this.state.value}
                    onChange={::this.onChange}
                />
            </div>
        )
    }

}

export default RemaEditor