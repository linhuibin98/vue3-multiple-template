// Shannon-Wiener指数
const str1 = `
BY1c1     BY1c2     BY1c3     BY1c4     BY1g1     BY1g3     BY1g4      BY1q
2.2843395 0.7761394 1.5531608 1.4868904 0.9125468 0.0000000 1.9364671 1.9670612
   HGH1c1    HGH1c2    HGH1c3    HGH1c4    HGH1g1    HGH1g2    HGH1g3    HGH1g4
0.8207303 0.5859526 1.7889490 0.7647544 1.0986123 1.9060159 1.2405367 0.5968294
    HGH1q    HGH2c1    HGH2c2    HGH2c3    HGH2c4    HGH2g2    HGH2g3    HGH2g4
0.9556999 0.0000000 1.0437570 0.5982696 0.0000000 0.4101163 0.6365142 0.9868994
    HGH2q    HGH3c1    HGH3c2    HGH3c3    HGH3c4    HGH3g1    HGH3g2    HGH3g3
1.1654984 1.3142261 1.0733943 0.9238407 1.0424739 0.4480454 0.0000000 0.1564106
   HGH3g4     HGH3q    HGH4c1    HGH4c2    HGH4c3    HGH4c4    HGH4g1    HGH4g2
1.4883516 1.3939064 0.0000000 0.0836497 0.3364958 0.5763341 0.3525425 0.2337917
   HGH4g3    HGH4g4     HGH4q    HGH5c1    HGH5c2    HGH5c3    HGH5c4    HGH5g1
0.6829081 0.0000000 0.8013882 0.9651856 0.7214637 0.5763341 1.0629658 1.4908575
   HGH5g2    HGH5g3    HGH5g4     HGH5q    HGH6c1    HGH6c2    HGH6c3    HGH6c4
2.1639557 1.1468147 1.6938816 1.9047248 0.1047324 0.5859526 0.0000000 0.8486856
   HGH6g1    HGH6g3    HGH6g4     HGH6q     LJ1c1     LJ1c2     LJ1c3     LJ1c4
0.0000000 1.5535844 0.9971970 1.3694534 1.5552391 1.2408300 1.2944777 1.1994787
    LJ1g1     LJ1g2     LJ1g3     LJ1g4      LJ1q     MZ1c1     MZ1c2     MZ1c3
2.0868441 1.7107468 2.2220274 2.3627719 1.2677890 0.9950270 0.4236112 0.9985176
    MZ1c4     MZ1g1     MZ1g2     MZ1g3     MZ1g4      MZ1q    MZH1c1    MZH1c2
1.2826291 2.3471428 1.7256050 1.9724968 1.9894111 1.3324314 1.1987876 1.6194868
   MZH1c3    MZH1c4    MZH1g1    MZH1g2    MZH1g3    MZH1g4     MZH1q      T1c1
0.9743148 1.3641005 1.0397208 1.1405143 0.7771193 1.5498260 2.0313323 1.6814791
     T1c2      T1c3      T1c4      T1g1      T1g2      T1g3      T1g4       T1q
1.5117161 2.1577913 1.5208985 0.5623351 1.2073168 0.6931472 0.3431330 1.6412302
`;

// Simpson指数
const str2 = `
BY1c1      BY1c2      BY1c3      BY1c4      BY1g1      BY1g3      BY1g4
0.88429752 0.45429962 0.73510188 0.69806094 0.44586594 0.00000000 0.78163265
      BY1q     HGH1c1     HGH1c2     HGH1c3     HGH1c4     HGH1g1     HGH1g2
0.82980278 0.43371901 0.39669421 0.78823731 0.42666667 0.66666667 0.81926621
    HGH1g3     HGH1g4      HGH1q     HGH2c1     HGH2c2     HGH2c3     HGH2c4
0.61980609 0.28595915 0.57142857 0.00000000 0.63111111 0.40816327 0.00000000
    HGH2g2     HGH2g3     HGH2g4      HGH2q     HGH3c1     HGH3c2     HGH3c3
0.24489796 0.44444444 0.53906250 0.53930506 0.67340869 0.65088757 0.55363322
    HGH3c4     HGH3g1     HGH3g2     HGH3g3     HGH3g4      HGH3q     HGH4c1
0.57481481 0.18440062 0.00000000 0.05697469 0.68514661 0.65532880 0.00000000
    HGH4c2     HGH4c3     HGH4c4     HGH4g1     HGH4g2     HGH4g3     HGH4g4
0.03224940 0.18836565 0.38781163 0.20031217 0.11718750 0.48979592 0.00000000
     HGH4q     HGH5c1     HGH5c2     HGH5c3     HGH5c4     HGH5g1     HGH5g2
0.42722222 0.57108864 0.40277778 0.38781163 0.59027778 0.66666667 0.88000000
    HGH5g3     HGH5g4      HGH5q     HGH6c1     HGH6c2     HGH6c3     HGH6c4
0.56000000 0.78571429 0.81463866 0.04253308 0.39669421 0.00000000 0.49382716
    HGH6g1     HGH6g3     HGH6g4      HGH6q      LJ1c1      LJ1c2      LJ1c3
0.00000000 0.70336507 0.58201721 0.70854638 0.77810651 0.68587106 0.69726562
     LJ1c4      LJ1g1      LJ1g2      LJ1g3      LJ1g4       LJ1q      MZ1c1
0.64625000 0.81025276 0.75089180 0.86425095 0.86553359 0.66918715 0.59259259
     MZ1c2      MZ1c3      MZ1c4      MZ1g1      MZ1g2      MZ1g3      MZ1g4
0.20345679 0.53950413 0.64264463 0.88750058 0.71224490 0.82963989 0.84490859
      MZ1q     MZH1c1     MZH1c2     MZH1c3     MZH1c4     MZH1g1     MZH1g2
0.70720000 0.60583572 0.78876033 0.59375000 0.68596919 0.62500000 0.64416504
    MZH1g3     MZH1g4      MZH1q       T1c1       T1c2       T1c3       T1c4
0.51920000 0.73922902 0.84615385 0.79395085 0.76127550 0.87267848 0.73718837
      T1g1       T1g2       T1g3       T1g4        T1q
0.37500000 0.63485822 0.50000000 0.17248131 0.78512397
`;

// Inverse Simpson指数
const str3 = `
BY1c1    BY1c2    BY1c3    BY1c4    BY1g1    BY1g3    BY1g4     BY1q
8.642857 1.832507 3.775036 3.311927 1.804617 1.000000 4.579439 5.875536
  HGH1c1   HGH1c2   HGH1c3   HGH1c4   HGH1g1   HGH1g2   HGH1g3   HGH1g4
1.765908 1.657534 4.722267 1.744186 3.000000 5.533000 2.630237 1.400480
   HGH1q   HGH2c1   HGH2c2   HGH2c3   HGH2c4   HGH2g2   HGH2g3   HGH2g4
2.333333 1.000000 2.710843 1.689655 1.000000 1.324324 1.800000 2.169492
   HGH2q   HGH3c1   HGH3c2   HGH3c3   HGH3c4   HGH3g1   HGH3g2   HGH3g3
2.170634 3.061931 2.864407 2.240310 2.351916 1.226092 1.000000 1.060417
  HGH3g4    HGH3q   HGH4c1   HGH4c2   HGH4c3   HGH4c4   HGH4g1   HGH4g2
3.176081 2.901316 1.000000 1.033324 1.232082 1.633484 1.250488 1.132743
  HGH4g3   HGH4g4    HGH4q   HGH5c1   HGH5c2   HGH5c3   HGH5c4   HGH5g1
1.960000 1.000000 1.745878 2.331484 1.674419 1.633484 2.440678 3.000000
  HGH5g2   HGH5g3   HGH5g4    HGH5q   HGH6c1   HGH6c2   HGH6c3   HGH6c4
8.333333 2.272727 4.666667 5.394868 1.044423 1.657534 1.000000 1.975610
  HGH6g1   HGH6g3   HGH6g4    HGH6q    LJ1c1    LJ1c2    LJ1c3    LJ1c4
1.000000 3.371147 2.392443 3.431078 4.506667 3.183406 3.303226 2.826855
   LJ1g1    LJ1g2    LJ1g3    LJ1g4     LJ1q    MZ1c1    MZ1c2    MZ1c3
5.270169 4.014320 7.366534 7.436801 3.022857 2.454545 1.255425 2.171572
   MZ1c4    MZ1g1    MZ1g2    MZ1g3    MZ1g4     MZ1q   MZH1c1   MZH1c2
2.798335 8.888935 3.475177 5.869919 6.447810 3.415301 2.537013 4.733959
  MZH1c3   MZH1c4   MZH1g1   MZH1g2   MZH1g3   MZH1g4    MZH1q     T1c1
2.461538 3.184401 2.666667 2.810292 2.079867 3.834783 6.500000 4.853211
    T1c2     T1c3     T1c4     T1g1     T1g2     T1g3     T1g4      T1q
4.188929 7.854132 3.805007 1.600000 2.738662 2.000000 1.208432 4.653846
`;

// 物种累计数
const str4 = `
BY1c1  BY1c2  BY1c3  BY1c4  BY1g1  BY1g3  BY1g4   BY1q HGH1c1 HGH1c2 HGH1c3
12      3      7      8      8      1     14      9      4      2      8
HGH1c4 HGH1g1 HGH1g2 HGH1g3 HGH1g4  HGH1q HGH2c1 HGH2c2 HGH2c3 HGH2c4 HGH2g2
 3      3      8      6      4      3      1      3      2      1      2
HGH2g3 HGH2g4  HGH2q HGH3c1 HGH3c2 HGH3c3 HGH3c4 HGH3g1 HGH3g2 HGH3g3 HGH3g4
 2      4      7      5      3      3      5      7      1      4      8
HGH3q HGH4c1 HGH4c2 HGH4c3 HGH4c4 HGH4g1 HGH4g2 HGH4g3 HGH4g4  HGH4q HGH5c1
 6      1      2      2      2      2      2      2      1      4      3
HGH5c2 HGH5c3 HGH5c4 HGH5g1 HGH5g2 HGH5g3 HGH5g4  HGH5q HGH6c1 HGH6c2 HGH6c3
 3      2      5      9      9      6      7     10      2      2      1
HGH6c4 HGH6g1 HGH6g3 HGH6g4  HGH6q  LJ1c1  LJ1c2  LJ1c3  LJ1c4  LJ1g1  LJ1g2
 3      1      9      5      5      5      4      5      5     16     10
LJ1g3  LJ1g4   LJ1q  MZ1c1  MZ1c2  MZ1c3  MZ1c4  MZ1g1  MZ1g2  MZ1g3  MZ1g4
13     17      5      3      3      4      5     14     11      9      9
MZ1q MZH1c1 MZH1c2 MZH1c3 MZH1c4 MZH1g1 MZH1g2 MZH1g3 MZH1g4  MZH1q   T1c1
 5      5      6      3      7      3      5      3      6      9      6
T1c2   T1c3   T1c4   T1g1   T1g2   T1g3   T1g4    T1q
 5     10      7      2      5      2      3      6
`;
// #Pielou均匀度指数
const str5 = `
BY1c1     BY1c2     BY1c3     BY1c4     BY1g1     BY1g3     BY1g4      BY1q
0.9192858 0.7064726 0.7981667 0.7150431 0.4388422       NaN 0.7337723 0.8952481
   HGH1c1    HGH1c2    HGH1c3    HGH1c4    HGH1g1    HGH1g2    HGH1g3    HGH1g4
0.5920317 0.8453509 0.8603026 0.6961095 1.0000000 0.9165999 0.6923567 0.4305214
    HGH1q    HGH2c1    HGH2c2    HGH2c3    HGH2c4    HGH2g2    HGH2g3    HGH2g4
0.8699155       NaN 0.9500686 0.8631206       NaN 0.5916728 0.9182958 0.7118975
    HGH2q    HGH3c1    HGH3c2    HGH3c3    HGH3c4    HGH3g1    HGH3g2    HGH3g3
0.5989477 0.8165746 0.9770456 0.8409160 0.6477255 0.2302498       NaN 0.1128264
   HGH3g4     HGH3q    HGH4c1    HGH4c2    HGH4c3    HGH4c4    HGH4g1    HGH4g2
0.7157458 0.7779540       NaN 0.1206810 0.4854608 0.8314744 0.5086113 0.3372901
   HGH4g3    HGH4g4     HGH4q    HGH5c1    HGH5c2    HGH5c3    HGH5c4    HGH5g1
0.9852281       NaN 0.5780794 0.8785498 0.6567045 0.8314744 0.6604578 0.6785185
   HGH5g2    HGH5g3    HGH5g4     HGH5q    HGH6c1    HGH6c2    HGH6c3    HGH6c4
0.9848587 0.6400495 0.8704829 0.8272115 0.1510970 0.8453509       NaN 0.7725069
   HGH6g1    HGH6g3    HGH6g4     HGH6q     LJ1c1     LJ1c2     LJ1c3     LJ1c4
      NaN 0.7070667 0.6195933 0.8508892 0.9663244 0.8950696 0.8043042 0.7452780
    LJ1g1     LJ1g2     LJ1g3     LJ1g4      LJ1q     MZ1c1     MZ1c2     MZ1c3
0.7526699 0.7429679 0.8663046 0.8339548 0.7877216 0.9057126 0.3855875 0.7202782
    MZ1c4     MZ1g1     MZ1g2     MZ1g3     MZ1g4      MZ1q    MZH1c1    MZH1c2
0.7969423 0.8893868 0.7196332 0.8977220 0.9054200 0.8278862 0.7448486 0.9038528
   MZH1c3    MZH1c4    MZH1g1    MZH1g2    MZH1g3    MZH1g4     MZH1q      T1c1
0.8868595 0.7010090 0.9463946 0.7086414 0.7073644 0.8649744 0.9244992 0.9384513
     T1c2      T1c3      T1c4      T1g1      T1g2      T1g3      T1g4       T1q
0.9392820 0.9371168 0.7815872 0.8112781 0.7501481 1.0000000 0.3123331 0.9159880
`;

module.exports = {
    str1, str2, str3, str4, str5
}