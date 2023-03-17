import { Switch } from 'antd'
import React from 'react'
import './Buttons.scss'

export const ContainedButton = ({value, width, onClick, type, id}) => {
  return (
    <button type={type ? type:"button"} id={id} className='sc-body-sb Contained-btn' style={{width:width}} onClick={onClick}>{value}</button>
  )
}

export const ContainedSecondaryButton = ({value, width, onClick}) => {
    return (
        <button type='button'  className='sc-body-sb sc-text-btn' style={{width:width}} onClick={onClick}>{value}</button>
    )
    }


export const ContainedIconButton = ({value, width, icon, onClick}) => {
    return (
        <button type='button' className='contained-icon-btn sc-body-sb' style={{width:width}} onClick={onClick}>
            {/* <img src="/images/icons/send_icon.svg" alt="icon" /> */}
            {icon}
            <p>{value}</p>
        </button>
    )
    }


export const GhostButton = ({value, width}) => {
    return (
        <button type='button' className='ghost-btn sc-body-sb' style={{width:width}} >{value}</button>
    )
    }

export const GhostIconButton = ({value, width, className, icon}) => {
    return (
        <button type='button' className={`${className} ghost-icon-btn sc-body-sb`} style={{width:width}}>
            <img src={icon} alt="icon" />
            <p>{value}</p>
        </button>
    )
    }


export const TextButton = ({value, width}) => {
    return (
        <button type='button' className='text-btn sc-body-sb' style={{width:width}}>{value}</button>
    )
    }

export const IconButton = () => {
    return (
        <button type='button' className='icon-btn'>
            <img src="/images/icons/send-primary-icon.svg" alt="icon" />
        </button>

    )
    }

export const FloatingActionButton = () => {
    return (
        <button type='button' className='floating-action-btn' >
            <img src="/images/icons/send_icon.svg" alt="icon" />
        </button>
    )
    }

export const ToggleButton = () => {
    return (
        <Switch ></Switch>
    )
    }


