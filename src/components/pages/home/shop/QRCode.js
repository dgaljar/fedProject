import React from 'react'
import {QRCodeSVG} from 'qrcode.react';

export const QRCode = ({form, value}) => {
    const PaymentInfo = 
    "HRVHUB30\n"
    +"HRK\n"
    +`${value}\n`
    +`${form.firstName} ${form.lastName}\n`
    +"PREVOJ DD\n"
    +"10000 Zagreb\n"
    +"FIRMA J.D.O.O\n"
    +"PREVOJ DD\n"
    +"10000 ZAGREB\n"
    +"HR012030210312\n"
    +"HR01\n"
    +"7336-68949637625-00001\n"
    +"Uplata za 1. mjesec"

  return (
    <QRCodeSVG value={PaymentInfo} />
  )
}
