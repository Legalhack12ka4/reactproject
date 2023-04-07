import { Switch } from 'antd'
import React, { useState } from 'react'
import './Buttons.scss'

export const ContainedButton = ({value, width, onClick, type, id,ref, loading, color}) => {

  return (
    <button
    type={type ? type : "button"}
    id={id}
    className={`sc-body-sb ${color==="danger" ? "Contained-btn-danger":"Contained-btn"} ${loading  ? 'loading-contained-btn animated zoomIn' : ''}`}
    style={{width: width}}
    onClick={onClick}>
    {loading ? <span className="spinner"></span> : value}
  </button>
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
            <img src={icon} alt="icon" />
            {/* {icon} */}
            <p>{value}</p>
        </button>
    )
    }

    export const ContainedIconButtonGray = ({value, width, icon, onClick}) => {
        return (
            <button type='button' className='contained-icon-btn-gray sc-body-sb' style={{width:width}} onClick={onClick}>
                <img src={icon} alt="icon" />

                <p>{value}</p>
            </button>
        )
        }


export const GhostButton = ({value, width, type, onClick}) => {
    return (
        <button type={type} className='ghost-btn sc-body-sb' onClick={onClick} style={{width:width}} >{value}</button>
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


