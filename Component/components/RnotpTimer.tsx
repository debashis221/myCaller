import {Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';

const RnOtpTimer = ({
  minute,
  second,
  fontsize,
  fontfamily,
  textcolor,
  labelfontsize,
  labelfontfamily,
  labelcolor,
  labeltext = '',
  onPress,
}) => {
  const [resendOtpPressed, setResendOtpPressed] = useState(false);

  let min = minute;
  let sec;
  if (second == 0) {
    sec = 59;
    min = min - 1;
  } else {
    sec = second;
  }

  const [minV, setMinV] = useState(min);
  const [secV, setSecV] = useState(sec);

  useEffect(() => {
    startTimer();
    setResendOtpPressed(true);
  }, []);

  function startTimer() {
    var countdownTimer = setInterval(function () {
      sec = sec - 1;
      if (min != 0 && sec == -1) {
        sec = 59;
        min = min - 1;
        setMinV(min);
      }
      setSecV(sec);

      if (min == 0 && sec <= 0) {
        clearInterval(countdownTimer);
        setResendOtpPressed(false);
        if (second == 0) {
          sec = 59;
          min = minute - 1;
        } else {
          sec = second;
        }
        setSecV(sec);
        setMinV(min);
      }
    }, 1000);
  }

  let resendOtp = () => {
    onPress();
    setResendOtpPressed(true);
    startTimer();
  };

  return (
    <View style={{alignSelf: 'center'}}>
      {resendOtpPressed ? (
        <Text
          style={{
            color: textcolor != null ? textcolor : 'red',
            fontSize: fontsize != null ? fontsize : 15,
          }}>
          {secV < 10 ? `${minV}:0${secV}` : `${minV}:${secV}`}
        </Text>
      ) : (
        <TouchableOpacity
          hitSlop={{top: 5, bottom: 5, left: 50, right: 50}}
          onPress={resendOtp}>
          <Text
            style={{
              color: labelcolor != null ? labelcolor : 'red',
              fontSize: labelfontsize != null ? labelfontsize : 15,
            }}>
            {labeltext.length != 0 ? labeltext : 'Resend OTP'}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default RnOtpTimer;
