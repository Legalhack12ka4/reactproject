import { Switch } from 'antd'
import React from 'react'
import './Buttons.scss'

export const ContainedButton = () => {
  return (
    <button className='sc-body-sb Contained-btn'>ContainedButton</button>
  )
}

export const ContainedSecondaryButton = () => {
    return (
        <button className='sc-body-sb sc-text-btn'>ContainedSecondaryButton</button>
    )
    }


export const ContainedIconButton = () => {
    return (
        <button className='contained-icon-btn sc-body-sb'>
            <img src="/images/icons/send_icon.svg" alt="icon" />
            <p>ContainedIconButton</p>
        </button>
    )
    }


export const GhostButton = () => {
    return (
        <button className='ghost-btn sc-body-sb' >GhostButton</button>
    )
    }

export const GhostIconButton = () => {
    return (
        <button className='ghost-icon-btn sc-body-sb' >
            <img src="/images/icons/send-primary-icon.svg" alt="icon" />
            <p>GhostIconButton</p>
        </button>
    )
    }


export const TextButton = () => {
    return (
        <button className='text-btn sc-body-sb' >TextButton</button>
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


