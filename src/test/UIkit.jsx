import React from 'react'
import styled from 'styled-components'
import { TextInput, NumberInput, PullRadioBox, PullCheckBox, Button, OtherButton } from '../components/UI-kit'
import LinkButton from '../components/UI-kit/Button/LinkButton'

const UIkitStyled = styled.div`
    padding: 20px 30px;

    .title{
        margin-bottom: 10px;
    }

    .content{
        padding-bottom: 15px;
    }

    .container{
        display: flex;
        &>div{
            width: 50%;
        }
    }

    hr{
        margin-top: 20px;
        margin-bottom: 20px;
    }

`

export default function UIkit() {
    return (
        <UIkitStyled>
            <div className='font_container container'>
                <div>
                    <h3 className='title'>Fonts</h3>
                    <div className='content font_group'>
                        <h1>Bounce font H1 60px</h1>
                        <h2>Bounce font H2 48px</h2>
                        <h3>Bounce font H3 32px</h3>
                    </div>
                </div>

                <div>
                    <h3 className='title'>Fonts</h3>
                    <div className='content font_group'>
                        <h4>Bounce font H4 24px</h4>
                        <h5>Bounce font H5 20px</h5>
                        <h6>Bounce font H6 16px</h6>
                        <p>Bounce font p 16px</p>
                        <span>Bounce font span 16px</span>
                    </div>
                </div>
            </div>

            <hr />
            <div className='input_container container'>
                <div>
                    <h3 className='title'>Text Inputs</h3>
                    <div className='content input_group'>
                        <TextInput title={'Name'} required defaultValue='Homie' />
                        <TextInput title={'Name'} placeholder={'Enter your name'} />
                        <TextInput title={'Name'} placeholder={'Enter your name'} disabled />
                    </div>
                </div>

                <div>
                    <h3 className='title'>Number Inputs</h3>
                    <div className='content select_group'>
                        <NumberInput title={'Number'} required minVal='0' maxVal='100' />
                        <NumberInput title={'Number'} placeholder={'Enter your Number'} />
                        <NumberInput title={'Number'} placeholder={'Enter your Number'} disabled />
                    </div>
                </div>
            </div>

            <hr />
            <div className='select_container container'>
                <div>
                    <h3 className='title'>Filter</h3>
                    <div className='content select_group'>
                        <PullRadioBox options={[{
                            value: 'Images'
                        }, {
                            value: 'Video'
                        }, {
                            value: 'Audio'
                        }, {
                            value: 'Games'
                        }, {
                            value: 'Others'
                        }]} defaultValue='Images' onChange={(item) => {
                            // console.log(item)
                        }} />

                        <PullRadioBox disabled options={[{
                            value: 'Images'
                        }]} />
                    </div>
                </div>

                <div>
                    <h3 className='title'>Filter with checkbox</h3>
                    <div className='content input_group'>
                        <PullCheckBox prefix='Categories:' options={[{
                            value: 'Images'
                        }, {
                            value: 'Video'
                        }, {
                            value: 'Audio'
                        }, {
                            value: 'Games'
                        }, {
                            value: 'Others'
                        }]} defaultValue={['Images', 'Games']} onChange={(item) => {
                            // console.log(item)
                        }} />

                        <PullCheckBox prefix='Categories:' options={[{
                            value: 'Images'
                        }, {
                            value: 'Video'
                        }, {
                            value: 'Audio'
                        }, {
                            value: 'Games'
                        }, {
                            value: 'Others'
                        }]} disabled onChange={(item) => {
                            // console.log(item)
                        }} />
                    </div>
                </div>
            </div>

            <hr />

            <div className='Button_container'>
                <div>
                    <h3 className='title'>Buttons</h3>
                    <div className='content button_group'>
                        <Button value={'Check Status'} size='lg' onClick={() => { alert('clock Button') }} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} size='lg' disabled onClick={() => { alert('clock Button') }} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} size='lg' primary />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} size='lg' primary disabled />
                        <br />
                        <br />

                        <Button value={'Check Status'} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} disabled />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} primary />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} primary disabled />
                        <br />
                        <br />

                        <Button value={'Check Status'} size='sm' />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} size='sm' disabled />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} size='sm' primary />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <Button value={'Check Status'} size='sm' primary disabled />
                        <br />
                        <br />

                        <OtherButton type='setting' value={'Setting'} onClick={() => { alert('setting') }} />
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        <OtherButton type='setting' value={'Setting'} disabled />
                        
                        <LinkButton to="/Home" width="30px" >LinkButton</LinkButton>
                        <br />
                    </div>
                </div>
            </div>
        </UIkitStyled>
    )
}