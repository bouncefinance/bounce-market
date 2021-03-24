import React from 'react'
import styled, { css } from 'styled-components'
import { animated, useTransition, useSpring } from 'react-spring'
import { DialogOverlay, DialogContent } from '@reach/dialog'
import { isMobile } from 'react-device-detect'
import { useGesture } from 'react-use-gesture'
import { transparentize } from 'polished'
import '@reach/dialog/styles.css'
import icon_close from '@assets/images/icon/close.svg'

const AnimatedDialogOverlay = animated(DialogOverlay)


const StyledDialogOverlay = styled(AnimatedDialogOverlay)`
  &[data-reach-dialog-overlay] {
    z-index: 9999;
    background-color: rgba(0,0,0,0.1);
    overflow: hidden;

    display: flex;
    align-items: center;
    justify-content: center;

    /* background-color: ${({ theme }) => theme.modalBG}; */
    
    background-color: rgba(0,0,0,.7);
    @media (max-width: 767px) {
      background-color: rgba(0,0,0,.7);
      padding-top: 50px;
    }
  }
`

const AnimatedDialogContent = animated(DialogContent)


const StyledDialogContent = styled(({ minHeight, maxHeight, maxWidth, mobile, isOpen, ...rest }) => (
  <AnimatedDialogContent {...rest} />
)).attrs({
  'aria-label': 'dialog'
})`
  overflow-y: ${({ mobile }) => (mobile ? 'scroll!important' : 'hidden')};

  &[data-reach-dialog-content] {
    margin: 0 0 2rem 0;
    background-color: ${({ theme }) => theme.bg1};
    box-shadow: 0 4px 8px 0 ${({ theme }) => transparentize(0.95, '#2F80ED')};
    padding: 0px;
    width: 50vw;
    overflow-y: ${({ mobile }) => (mobile ? 'scroll!important' : 'hidden')};
    overflow-x: hidden;
    
    align-self: 'center';

    max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : '420px')};

    ${({ maxHeight }) =>
    maxHeight &&
    css`
        max-height: ${maxHeight}vh;
      `}
    ${({ minHeight }) =>
    minHeight &&
    css`
        min-height: ${minHeight}vh;
      `}
    display: flex;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    align-items: center;
    padding-bottom: 47px;
    @media (max-width: 767px) {
      width: 90vw;
      min-height:100vh;
      overflow-y: scroll!important;
      padding-bottom: 100px;
      margin-top:50px;
    }
  }
`

export const ModalMask = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
`

export const ModalTitle = styled.span`
  font-family: Optima;
  font-style: normal;
  font-weight: bold;
  font-size: 26px;
  line-height: 32px;
  border-bottom: 4px solid #000000;
  width: 320px;
  padding-bottom: 20px;
  padding-top: 14px;
  text-align: left;
`

export const ModalIcon = styled.span`
  width: 320px;
  height: 148px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const CloseIcon = styled.img`
  width: 16px;
  margin-left: auto;
  margin-right: -16px;
  cursor: pointer;

  &:hover{
    opacity: .6
  }
`

export const ModalContent = styled.span`
  font-family: IBM Plex Mono;
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 140%;
  width: 320px;
  margin-top: 20px;
  margin-bottom: 27px;
  text-align: left;
`

export const ModalButtonFrame = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`

export default function Modal({
  isOpen,
  onDismiss,
  minHeight = false,
  maxHeight = 90,
  initialFocusRef,
  closeable,
  children,
  maxWidth
}) {
  const fadeTransition = useTransition(isOpen, null, {
    config: { duration: 200 },
    from: { opacity: 0 },
    enter: { opacity: 1 },
    leave: { opacity: 0 }
  })

  const [{ y }, set] = useSpring(() => ({ y: 0, config: { mass: 1, tension: 210, friction: 20 } }))
  const bind = useGesture({
    onDrag: state => {
      set({
        y: state.down ? state.movement[1] : 0
      })
      if (state.movement[1] > 300 || (state.velocity > 3 && state.direction[1] > 0)) {
        onDismiss()
      }
    }
  })

  return (
    <>
      {fadeTransition.map(
        ({ item, key, props }) =>
          item && (
            <StyledDialogOverlay key={key} style={props}
              // onDismiss={onDismiss}
              initialFocusRef={initialFocusRef}>
              <StyledDialogContent
                style={{ paddingTop: 26, display: 'grid', overflow: 'auto' }}
                {...(isMobile
                  ? {
                    ...bind(),
                    style: { transform: y.interpolate(y => `translateY(${y > 0 ? y : 0}px)`) }
                  }
                  : {})}
                aria-label="dialog content"
                minHeight={minHeight}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                mobile={isMobile}
              >
                {/* prevents the automatic focusing of inputs on mobile by the reach dialog */}
                {!initialFocusRef && isMobile ? <div tabIndex={1} /> : null}
                {closeable && <CloseIcon src={icon_close} onClick={onDismiss} />}
                {children}
              </StyledDialogContent>
            </StyledDialogOverlay>
          )
      )}
    </>
  )
}


