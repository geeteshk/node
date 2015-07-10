#!/usr/bin/env bash

rm -rf android-ndk-r10e
wget http://dl.google.com/android/ndk/android-ndk-r10e-linux-x86_64.bin
df -h
chmod a+x *.bin
./*.bin > null
df -h
