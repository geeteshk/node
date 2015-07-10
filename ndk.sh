#!/usr/bin/env bash

if [ -d "android-ndk-r10e" ]; then
  wget http://dl.google.com/android/ndk/android-ndk-r10e-linux-x86_64.bin
  chmod a+x *.bin
  ./*.bin
  rm *.bin
fi
