import { Switch } from 'antd'
import React from 'react'
import './Buttons.scss'

export const ContainedButton = ({value, width}) => {
  return (
    <button className='sc-body-sb Contained-btn' style={{width:width}}>{value}</button>
  )
}

export const ContainedSecondaryButton = ({value, width}) => {
    return (
        <button className='sc-body-sb sc-text-btn' style={{width:width}}>{value}</button>
    )
    }


export const ContainedIconButton = ({value, width}) => {
    return (
        <button className='contained-icon-btn sc-body-sb' style={{width:width}}>
            <img src="/images/icons/send_icon.svg" alt="icon" />
            <p>{value}</p>
        </button>
    )
    }


export const GhostButton = ({value, width}) => {
    return (
        <button className='ghost-btn sc-body-sb' style={{width:width}} >{value}</button>
    )
    }

export const GhostIconButton = ({value, width}) => {
    return (
        <button className='ghost-icon-btn sc-body-sb' style={{width:width}}>
            <img src="/images/icons/send-primary-icon.svg" alt="icon" />
            <p>{value}</p>
        </button>
    )
    }


export const TextButton = ({value, width}) => {
    return (
        <button className='text-btn sc-body-sb' style={{width:width}}>{value}</button>
    )
    }

export const IconButton = () => {
    return (
        <button className='icon-btn'>
            <img src="/images/icons/send-primary-icon.svg" alt="icon" />
        </button>

    )
    }

export const FloatingActionButton = () => {
    return (
        <button className='floating-action-btn' >
            <img src="/images/icons/send_icon.svg" alt="icon" />
        </button>
    )
    }

export const ToggleButton = () => {
    return (
        <Switch ></Switch>
    )
    }


