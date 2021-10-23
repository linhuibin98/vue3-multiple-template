const str1 = `
A1c1      A1c2      A1c3      A1c4      A1g1      A1g2      A1g3      A1g4
0.0000000 0.6869616 0.0000000 0.0000000 0.6906341 0.8887609 0.7959543 0.5965957
      A1q      A2c1      A2c2      A2c3      A2c4      A2g1      A2g2      A2g3
0.9521154 0.6869616 0.3622106 0.0000000 0.0000000 1.5789173 0.9326682 1.5283979
     A2g4       A2q     BY1c1     BY1c2     BY1c3     BY1c4     BY1g1     BY1g2
1.5016184 0.7925966 0.5235863 0.0000000 0.4400415 0.5824257 1.6738341 1.7635801
    BY1g3     BY1g4      BY1q     CT1c1     CT1c2     CT1c3     CT1c4     CT1g1
1.7948037 1.7926135 1.0175088 0.0000000 0.5459693 0.7564091 0.9935392 1.6327286
    CT1g2     CT1g3     CT1g4      CT1q     CT2c1     CT2c2     CT2c3     CT2c4
1.3062890 1.6773300 1.2448449 0.0000000 0.0000000 0.2102834 1.1884748 0.5338920
    CT2g1     CT2g2     CT2g3     CT2g4      CT2q     FW1c1     FW1c2     FW1c3
1.5856785 1.9104108 1.4544323 1.3302818 1.6845372 0.6108643 0.8882847 0.8589441
    FW1c4     FW1g1     FW1g2     FW1g3     FW1g4      FW1q     GW1c1     GW1c2
0.0000000 1.4419904 1.8460525 0.9386502 0.9830878 0.0000000 0.0000000 0.0000000
    GW1c3     GW1c4     GW1c5     GW1g1     GW1g2     GW1g3     GW1g4     GW1g5
1.3819787 0.9029057 0.6460905 1.7684052 2.3473400 2.5145741 1.8052855 2.5445039
     GW1q     GW2c1     GW2c2     GW2c3     GW2c4     GW2g1     GW2g2     GW2g3
1.9003628 0.5004024 0.4101163 0.0000000 0.6517566 2.1786376 0.9985803 2.4200957
    GW2g4      GW2q     GW3c1     GW3c2     GW3c3     GW3c4     GW3g1     GW3g2
2.1600053 1.1765897 0.0000000 0.0000000 0.0000000 0.0000000 1.4648223 1.6098561
    GW3g3     GW3g4      GW3q     GW4c1     GW4c2     GW4c3     GW4c4     GW4g1
0.9426643 1.4383108 0.5104961 0.0000000 0.4741393 0.0000000 0.0000000 2.3203554
    GW4g2     GW4g3     GW4g4      GW4q     GW5c1     GW5c2     GW5c3     GW5c4
2.6880721 1.7872784 2.7942850 1.0451965 0.0000000 0.0000000 0.0000000 0.8169152
    GW5g1     GW5g2     GW5g3     GW5g4      GW5q    MYS1c1    MYS1c2    MYS1c3
1.1375032 1.2593053 1.6830006 1.9752828 0.9312981 0.3404998 0.6901857 0.0000000
   MYS1c4    MYS1g1    MYS1g2    MYS1g3    MYS1g4     MYS1q    MYS2c1    MYS2c2
0.0000000 1.5820504 1.6305816 0.9907099 1.9743748 0.3805862 0.4505612 0.8675632
   MYS2c3    MYS2c4    MYS2g1    MYS2g2    MYS2g3    MYS2g4     MYS2q     NL1c1
1.0361988 1.2004978 2.5190279 1.4572086 2.0440018 2.1600032 0.5007448 0.0000000
    NL1c2     NL1c3     NL1c4     NL1g1     NL1g2     NL1g3     NL1g4      NL1q
0.6517566 0.2711894 0.4370946 1.8288184 1.5455172 1.8078830 1.9337474 0.8644257
    NL2c1     NL2c2     NL2c3     NL2c4     NL2g1     NL2g2     NL2g3     NL2g4
0.8595276 1.5702923 0.9864634 0.1759751 1.4109897 1.7567227 1.8340335 2.0311944
     NL2q    NST1c1    NST1c2    NST1c3    NST1c4    NST1g1    NST1g2    NST1g3
1.2289579 1.6513522 1.5761655 1.2072391 1.4556914 1.7737819 1.4806201 0.8008538
   NST1g4     NST1q    NST2c1    NST2c2    NST2c3    NST2c4    NST2g1    NST2g2
1.2128670 0.0000000 0.0000000 0.6365142 0.0000000 0.4236112 2.0152248 1.1042340
   NST2g3    NST2g4     NST2q    NSW1c1    NSW1c2    NSW1c3    NSW1c4    NSW1g1
1.4383866 1.3420502 0.4875075 0.5982696 0.6220491 0.3170678 0.0000000 1.1882607
   NSW1g2    NSW1g3    NSW1g4     NSW1q     QP1c1     QP1c2     QP1c3     QP1c4
1.8820924 2.1574798 1.6912252 0.5182066 0.8326399 0.3488321 0.1425059 0.7197721
    QP1g1     QP1g2     QP1g3     QP1g4      QP1q    TLS1c1    TLS1c2    TLS1c3
1.5007614 1.5624349 1.4686620 1.7435940 0.7611616 0.0000000 0.2337917 0.6730117
   TLS1c4    TLS1g1    TLS1g2    TLS1g3    TLS1g4     TLS1q     XF1c1     XF1c2
0.5099633 2.0057711 1.7812237 2.4127168 2.2481609 0.3981711 1.0114043 0.0000000
    XF1c3     XF1c4     XF1g1     XF1g2     XF1g3     XF1g4      XF1q     XF2c1
0.1808164 0.5951551 2.0496119 1.2294589 2.4418167 2.3338861 0.5320768 0.4536929
    XF2c2     XF2c3     XF2c4     XF2g1     XF2g2     XF2g3     XF2g4      XF2q
0.4271559 0.1759751 0.1949087 1.9313588 1.2273291 2.3085876 1.8586391 0.4960994
    XF3c1     XF3c2     XF3c3     XF3c4     XF3g1     XF3g2     XF3g3     XF3g4
0.7415148 0.8432245 1.2508431 0.6605789 1.6307821 1.8099228 1.0534310 1.6386861
     XF3q     YL1c1     YL1c2     YL1c3     YL1c4     YL1g1     YL1g2     YL1g3
0.1425059 0.9773202 1.2110728 1.5223633 1.5171064 2.1296984 2.5033282 2.2918487
    YL1g4      YL1q     YL2c1     YL2c2     YL2c3     YL2c4     YL2g1     YL2g2
1.9457657 0.7029189 1.7548369 1.6658842 2.0231928 2.2547789 1.0903326 1.4031353
    YL2g3     YL2g4      YL2q     YL3c1     YL3c2     YL3c3     YL3c4     YL3g1
1.8564093 2.3137497 0.6072494 0.0000000 0.8872110 1.0789922 0.6314260 1.4660098
    YL3g2     YL3g3     YL3g4      YL3q     YL4c1     YL4c2     YL4c3     YL4c4
2.1290160 1.5222939 1.3716873 1.0622573 0.9458648 0.6869616 1.2366849 1.2150027
    YL4g1     YL4g2     YL4g3     YL4g4      YL4q     YL5c1     YL5c2     YL5c3
1.7976602 1.4734142 1.6425967 1.7275099 0.6559757 0.9238407 1.1439322 0.6869616
    YL5c4     YL5g1     YL5g2     YL5g3     YL5g4      YL5q     YL6c1     YL6c2
1.4217021 1.6739243 1.5737179 0.6852946 2.1452369 1.2592005 0.2337917 0.5253213
    YL6c3     YL6c4     YL6g1     YL6g2     YL6g3     YL6g4      YL6q     YL7c1
0.0000000 1.2797951 1.0916639 1.1887581 0.9245886 0.9751606 0.2984358 0.6829081
    YL7c2     YL7c3     YL7c4     YL7g1     YL7g2     YL7g3     YL7g4      YL7q
0.9556999 0.5623351 1.1860718 1.0416677 1.7890958 1.4913349 1.5412585 0.0000000
   YL8Mc1    YL8Mc2    YL8Mc3    YL8Mc4    YL8Mg1    YL8Mg2    YL8Mg3    YL8Mg4
0.9191738 0.0000000 0.0000000 1.0531657 1.2818195 1.4161013 0.1715388 1.4786213
    YL8Mq    YL8Pc1    YL8Pc2    YL8Pc3    YL8Pc4    YL8Pg1    YL8Pg2    YL8Pg3
0.6680178 0.4505612 0.8037421 1.2933981 1.5159868 1.5449022 1.1205081 0.9057416
   YL8Pg4     YL8Pq     YL9c1     YL9c2     YL9c3     YL9c4     YL9g1     YL9g2
1.6965800 0.7460327 1.1363816 0.8668219 0.9433484 1.2828972 1.5901963 1.8376552
    YL9g3     YL9g4      YL9q
1.7384349 2.0563279 1.2523888
`;

const str2 = `
A1c1       A1c2       A1c3       A1c4       A1g1       A1g2       A1g3
0.00000000 0.49382716 0.00000000 0.00000000 0.49748899 0.49319311 0.47789612
      A1g4        A1q       A2c1       A2c2       A2c3       A2c4       A2g1
0.38270128 0.49263039 0.49382716 0.20761246 0.00000000 0.00000000 0.67160681
      A2g2       A2g3       A2g4        A2q      BY1c1      BY1c2      BY1c3
0.41283951 0.68793943 0.71488033 0.34987654 0.34026465 0.00000000 0.21410035
     BY1c4      BY1g1      BY1g2      BY1g3      BY1g4       BY1q      CT1c1
0.32979592 0.78781665 0.79516251 0.80080000 0.77929804 0.45877153 0.00000000
     CT1c2      CT1c3      CT1c4      CT1g1      CT1g2      CT1g3      CT1g4
0.29488704 0.38527285 0.48352411 0.72664360 0.60102473 0.67768444 0.61065089
      CT1q      CT2c1      CT2c2      CT2c3      CT2c4      CT2g1      CT2g2
0.00000000 0.00000000 0.10226443 0.63550037 0.25112730 0.65187377 0.80803571
     CT2g3      CT2g4       CT2q      FW1c1      FW1c2      FW1c3      FW1c4
0.67994568 0.69550173 0.75250613 0.42000000 0.48114093 0.52858374 0.00000000
     FW1g1      FW1g2      FW1g3      FW1g4       FW1q      GW1c1      GW1c2
0.67820069 0.82716049 0.49600000 0.51388889 0.00000000 0.00000000 0.00000000
     GW1c3      GW1c4      GW1c5      GW1g1      GW1g2      GW1g3      GW1g4
0.74792244 0.50598752 0.45368620 0.74652778 0.87120000 0.90530697 0.77504726
     GW1g5       GW1q      GW2c1      GW2c2      GW2c3      GW2c4      GW2g1
0.89261463 0.81455833 0.32000000 0.24489796 0.00000000 0.45918367 0.82184499
     GW2g2      GW2g3      GW2g4       GW2q      GW3c1      GW3c2      GW3c3
0.57673817 0.87871581 0.80910162 0.60515556 0.00000000 0.00000000 0.00000000
     GW3c4      GW3g1      GW3g2      GW3g3      GW3g4       GW3q      GW4c1
0.00000000 0.65777940 0.73372781 0.40831758 0.65625000 0.25389884 0.00000000
     GW4c2      GW4c3      GW4c4      GW4g1      GW4g2      GW4g3      GW4g4
0.29752066 0.00000000 0.00000000 0.86857761 0.92214533 0.73616895 0.91921963
      GW4q      GW5c1      GW5c2      GW5c3      GW5c4      GW5g1      GW5g2
0.59756848 0.00000000 0.00000000 0.00000000 0.47086801 0.57453076 0.51794434
     GW5g3      GW5g4       GW5q     MYS1c1     MYS1c2     MYS1c3     MYS1c4
0.66617284 0.80263614 0.44319176 0.19132653 0.49704142 0.00000000 0.00000000
    MYS1g1     MYS1g2     MYS1g3     MYS1g4      MYS1q     MYS2c1     MYS2c2
0.70266272 0.71227811 0.56157049 0.81098616 0.16435826 0.27777778 0.50000000
    MYS2c3     MYS2c4     MYS2g1     MYS2g2     MYS2g3     MYS2g4      MYS2q
0.62809917 0.65820312 0.90600000 0.57183673 0.81521419 0.84441596 0.22341355
     NL1c1      NL1c2      NL1c3      NL1c4      NL1g1      NL1g2      NL1g3
0.00000000 0.45918367 0.14201183 0.21376394 0.79333333 0.56050387 0.76593600
     NL1g4       NL1q      NL2c1      NL2c2      NL2c3      NL2c4      NL2g1
0.81563558 0.44929618 0.54700855 0.78373702 0.58977408 0.08148483 0.64816327
     NL2g2      NL2g3      NL2g4       NL2q     NST1c1     NST1c2     NST1c3
0.75679012 0.79111111 0.81769490 0.60355030 0.69156900 0.74509221 0.65625000
    NST1c4     NST1g1     NST1g2     NST1g3     NST1g4      NST1q     NST2c1
0.69532880 0.79117063 0.70703486 0.46871447 0.57618122 0.00000000 0.00000000
    NST2c2     NST2c3     NST2c4     NST2g1     NST2g2     NST2g3     NST2g4
0.44444444 0.00000000 0.20345679 0.83095569 0.54064924 0.68906667 0.61625709
     NST2q     NSW1c1     NSW1c2     NSW1c3     NSW1c4     NSW1g1     NSW1g2
0.19074978 0.40816327 0.43060361 0.17419074 0.00000000 0.65927978 0.81525312
    NSW1g3     NSW1g4      NSW1q      QP1c1      QP1c2      QP1c3      QP1c4
0.82840237 0.71714440 0.23405654 0.42524005 0.19753086 0.06243496 0.35872576
     QP1g1      QP1g2      QP1g3      QP1g4       QP1q     TLS1c1     TLS1c2
0.66420010 0.65397924 0.73067498 0.77748747 0.41672965 0.00000000 0.11718750
    TLS1c3     TLS1c4     TLS1g1     TLS1g2     TLS1g3     TLS1g4      TLS1q
0.48000000 0.26256225 0.79316483 0.71926653 0.87881078 0.81820075 0.19754253
     XF1c1      XF1c2      XF1c3      XF1c4      XF1g1      XF1g2      XF1g3
0.61111111 0.00000000 0.08434256 0.29166667 0.83861059 0.56258679 0.87804057
     XF1g4       XF1q      XF2c1      XF2c2      XF2c3      XF2c4      XF2g1
0.85080304 0.22916667 0.22096421 0.20765903 0.08148483 0.09280190 0.84244946
     XF2g2      XF2g3      XF2g4       XF2q      XF3c1      XF3c2      XF3c3
0.64122548 0.88647959 0.82045184 0.26108265 0.41195111 0.42281575 0.68402778
     XF3c4      XF3g1      XF3g2      XF3g3      XF3g4       XF3q      YL1c1
0.35457064 0.70256931 0.73063712 0.45421488 0.74348422 0.06243496 0.58049887
     YL1c2      YL1c3      YL1c4      YL1g1      YL1g2      YL1g3      YL1g4
0.59680000 0.73572531 0.76388889 0.85664820 0.90358127 0.87504450 0.80243200
      YL1q      YL2c1      YL2c2      YL2c3      YL2c4      YL2g1      YL2g2
0.39843750 0.77051229 0.72427984 0.82600079 0.88180737 0.58222222 0.66678313
     YL2g3      YL2g4       YL2q      YL3c1      YL3c2      YL3c3      YL3c4
0.75268360 0.81694864 0.28780131 0.00000000 0.54869684 0.65306122 0.29604938
     YL3g1      YL3g2      YL3g3      YL3g4       YL3q      YL4c1      YL4c2
0.70345175 0.86371528 0.70841712 0.67612405 0.49702735 0.56228374 0.49382716
     YL4c3      YL4c4      YL4g1      YL4g2      YL4g3      YL4g4       YL4q
0.68055556 0.67212531 0.79068047 0.63623083 0.68848035 0.75849222 0.35714286
     YL5c1      YL5c2      YL5c3      YL5c4      YL5g1      YL5g2      YL5g3
0.55363322 0.61728395 0.49382716 0.70280612 0.75735294 0.75054820 0.29179698
     YL5g4       YL5q      YL6c1      YL6c2      YL6c3      YL6c4      YL6g1
0.84998915 0.55500000 0.11718750 0.34179688 0.00000000 0.69714803 0.58158730
     YL6g2      YL6g3      YL6g4       YL6q      YL7c1      YL7c2      YL7c3
0.67215364 0.40706209 0.41238212 0.16089965 0.48979592 0.57142857 0.37500000
     YL7c4      YL7g1      YL7g2      YL7g3      YL7g4       YL7q     YL8Mc1
0.56111363 0.49996084 0.78589965 0.63544958 0.66958402 0.00000000 0.53819444
    YL8Mc2     YL8Mc3     YL8Mc4     YL8Mg1     YL8Mg2     YL8Mg3     YL8Mg4
0.00000000 0.00000000 0.58984911 0.61573524 0.67390642 0.06607297 0.67296034
     YL8Mq     YL8Pc1     YL8Pc2     YL8Pc3     YL8Pc4     YL8Pg1     YL8Pg2
0.38095238 0.27777778 0.45674740 0.70216049 0.71533517 0.71394231 0.61052897
    YL8Pg3     YL8Pg4      YL8Pq      YL9c1      YL9c2      YL9c3      YL9c4
0.40142661 0.76170587 0.44500000 0.62235208 0.49975309 0.58000000 0.66009204
     YL9g1      YL9g2      YL9g3      YL9g4       YL9q
0.69610586 0.78755753 0.74026159 0.81335391 0.52677123
`;

const str3 = `
A1c1      A1c2      A1c3      A1c4      A1g1      A1g2      A1g3      A1g4
1.000000  1.975610  1.000000  1.000000  1.990006  1.973138  1.915328  1.619961
     A1q      A2c1      A2c2      A2c3      A2c4      A2g1      A2g2      A2g3
1.970950  1.975610  1.262009  1.000000  1.000000  3.045130  1.703112  3.204506
    A2g4       A2q     BY1c1     BY1c2     BY1c3     BY1c4     BY1g1     BY1g2
3.507299  1.538169  1.515759  1.000000  1.272427  1.492083  4.712905  4.881919
   BY1g3     BY1g4      BY1q     CT1c1     CT1c2     CT1c3     CT1c4     CT1g1
5.020080  4.530997  1.847649  1.000000  1.418212  1.626738  1.936199  3.658228
   CT1g2     CT1g3     CT1g4      CT1q     CT2c1     CT2c2     CT2c3     CT2c4
2.506421  3.102550  2.568389  1.000000  1.000000  1.113914  2.743487  1.335340
   CT2g1     CT2g2     CT2g3     CT2g4      CT2q     FW1c1     FW1c2     FW1c3
2.872521  5.209302  3.124470  3.284091  4.040504  1.724138  1.927306  2.121268
   FW1c4     FW1g1     FW1g2     FW1g3     FW1g4      FW1q     GW1c1     GW1c2
1.000000  3.107527  5.785714  1.984127  2.057143  1.000000  1.000000  1.000000
   GW1c3     GW1c4     GW1c5     GW1g1     GW1g2     GW1g3     GW1g4     GW1g5
3.967033  2.024240  1.830450  3.945205  7.763975 10.560440  4.445378  9.312255
    GW1q     GW2c1     GW2c2     GW2c3     GW2c4     GW2g1     GW2g2     GW2g3
5.392531  1.470588  1.324324  1.000000  1.849057  5.613090  2.362604  8.245098
   GW2g4      GW2q     GW3c1     GW3c2     GW3c3     GW3c4     GW3g1     GW3g2
5.238389  2.532643  1.000000  1.000000  1.000000  1.000000  2.922092  3.755556
   GW3g3     GW3g4      GW3q     GW4c1     GW4c2     GW4c3     GW4c4     GW4g1
1.690096  2.909091  1.340301  1.000000  1.423529  1.000000  1.000000  7.609053
   GW4g2     GW4g3     GW4g4      GW4q     GW5c1     GW5c2     GW5c3     GW5c4
12.844444  3.790304 12.379245  2.484895  1.000000  1.000000  1.000000  1.889888
   GW5g1     GW5g2     GW5g3     GW5g4      GW5q    MYS1c1    MYS1c2    MYS1c3
2.350346  2.074449  2.995562  5.066784  1.795950  1.236593  1.988235  1.000000
  MYS1c4    MYS1g1    MYS1g2    MYS1g3    MYS1g4     MYS1q    MYS2c1    MYS2c2
1.000000  3.363184  3.475578  2.280868  5.290618  1.196685  1.384615  2.000000
  MYS2c3    MYS2c4    MYS2g1    MYS2g2    MYS2g3    MYS2g4     MYS2q     NL1c1
2.688889  2.925714 10.638298  2.335558  5.411671  6.427394  1.287687  1.000000
   NL1c2     NL1c3     NL1c4     NL1g1     NL1g2     NL1g3     NL1g4      NL1q
1.849057  1.165517  1.271883  4.838710  2.275333  4.272336  5.424040  1.815858
   NL2c1     NL2c2     NL2c3     NL2c4     NL2g1     NL2g2     NL2g3     NL2g4
2.207547  4.624000  2.437681  1.088714  2.842227  4.111675  4.787234  5.485310
    NL2q    NST1c1    NST1c2    NST1c3    NST1c4    NST1g1    NST1g2    NST1g3
2.522388  3.242216  3.922987  2.909091  3.282227  4.788599  3.413375  1.882227
  NST1g4     NST1q    NST2c1    NST2c2    NST2c3    NST2c4    NST2g1    NST2g2
2.359499  1.000000  1.000000  1.800000  1.000000  1.255425  5.915609  2.176986
  NST2g3    NST2g4     NST2q    NSW1c1    NSW1c2    NSW1c3    NSW1c4    NSW1g1
3.216123  2.605911  1.235712  1.689655  1.756246  1.210933  1.000000  2.934959
  NSW1g2    NSW1g3    NSW1g4     NSW1q     QP1c1     QP1c2     QP1c3     QP1c4
5.412811  5.827586  3.535373  1.305579  1.739857  1.246154  1.066593  1.559395
   QP1g1     QP1g2     QP1g3     QP1g4      QP1q    TLS1c1    TLS1c2    TLS1c3
2.977964  2.890000  3.712986  4.494129  1.714471  1.000000  1.132743  1.923077
  TLS1c4    TLS1g1    TLS1g2    TLS1g3    TLS1g4     TLS1q     XF1c1     XF1c2
1.356047  4.834768  3.562098  8.251559  5.500573  1.246172  2.571429  1.000000
   XF1c3     XF1c4     XF1g1     XF1g2     XF1g3     XF1g4      XF1q     XF2c1
1.092111  1.411765  6.196193  2.286168  8.199448  6.702550  1.297297  1.283638
   XF2c2     XF2c3     XF2c4     XF2g1     XF2g2     XF2g3     XF2g4      XF2q
1.262083  1.088714  1.102295  6.347170  2.787266  8.808989  5.569536  1.353331
   XF3c1     XF3c2     XF3c3     XF3c4     XF3g1     XF3g2     XF3g3     XF3g4
1.700539  1.732549  3.164835  1.549356  3.362128  3.712464  1.832223  3.898396
    XF3q     YL1c1     YL1c2     YL1c3     YL1c4     YL1g1     YL1g2     YL1g3
1.066593  2.383784  2.480159  3.783942  4.235294  6.975845 10.371429  8.002849
   YL1g4      YL1q     YL2c1     YL2c2     YL2c3     YL2c4     YL2g1     YL2g2
5.061548  1.662338  4.357532  3.626866  5.747153  8.460765  2.393617  3.001048
   YL2g3     YL2g4      YL2q     YL3c1     YL3c2     YL3c3     YL3c4     YL3g1
4.043404  5.462948  1.404103  1.000000  2.215805  2.882353  1.420554  3.372133
   YL3g2     YL3g3     YL3g4      YL3q     YL4c1     YL4c2     YL4c3     YL4c4
7.337580  3.429557  3.087602  1.988180  2.284585  1.975610  3.130435  3.049946
   YL4g1     YL4g2     YL4g3     YL4g4      YL4q     YL5c1     YL5c2     YL5c3
4.777385  2.748996  3.210070  4.140653  1.555556  2.240310  2.612903  1.975610
   YL5c4     YL5g1     YL5g2     YL5g3     YL5g4      YL5q     YL6c1     YL6c2
3.364807  4.121212  4.008791  1.412024  6.666184  2.247191  1.132743  1.519288
   YL6c3     YL6c4     YL6g1     YL6g2     YL6g3     YL6g4      YL6q     YL7c1
1.000000  3.301943  2.389985  3.050209  1.686517  1.701786  1.191753  1.960000
   YL7c2     YL7c3     YL7c4     YL7g1     YL7g2     YL7g3     YL7g4      YL7q
2.333333  1.600000  2.278494  1.999843  4.670707  2.743105  3.026488  1.000000
  YL8Mc1    YL8Mc2    YL8Mc3    YL8Mc4    YL8Mg1    YL8Mg2    YL8Mg3    YL8Mg4
2.165414  1.000000  1.000000  2.438127  2.602372  3.066604  1.070747  3.057733
   YL8Mq    YL8Pc1    YL8Pc2    YL8Pc3    YL8Pc4    YL8Pg1    YL8Pg2    YL8Pg3
1.615385  1.384615  1.840764  3.357513  3.512903  3.495798  2.567585  1.670639
  YL8Pg4     YL8Pq     YL9c1     YL9c2     YL9c3     YL9c4     YL9g1     YL9g2
4.196494  1.801802  2.647969  1.999013  2.380952  2.941973  3.290620  4.707157
   YL9g3     YL9g4      YL9q
3.850027  5.357733  2.113143
`;

const str4 = `
A1c1   A1c2   A1c3   A1c4   A1g1   A1g2   A1g3   A1g4    A1q   A2c1   A2c2
1      2      1      1      2      5      3      3      5      2      2
A2c3   A2c4   A2g1   A2g2   A2g3   A2g4    A2q  BY1c1  BY1c2  BY1c3  BY1c4
1      1     10      7      8      8      6      2      1      3      3
BY1g1  BY1g2  BY1g3  BY1g4   BY1q  CT1c1  CT1c2  CT1c3  CT1c4  CT1g1  CT1g2
7      8      8      9      9      1      3      4      5      9      7
CT1g3  CT1g4   CT1q  CT2c1  CT2c2  CT2c3  CT2c4  CT2g1  CT2g2  CT2g3  CT2g4
15      8      1      1      2      4      4     12     11      7      5
CT2q  FW1c1  FW1c2  FW1c3  FW1c4  FW1g1  FW1g2  FW1g3  FW1g4   FW1q  GW1c1
9      2      4      3      1      7      7      4      4      1      1
GW1c2  GW1c3  GW1c4  GW1c5  GW1g1  GW1g2  GW1g3  GW1g4  GW1g5   GW1q  GW2c1
1      4      4      2      9     15     15      9     19     11      2
GW2c2  GW2c3  GW2c4  GW2g1  GW2g2  GW2g3  GW2g4   GW2q  GW3c1  GW3c2  GW3c3
2      1      2     17      5     17     20      7      1      1      1
GW3c4  GW3g1  GW3g2  GW3g3  GW3g4   GW3q  GW4c1  GW4c2  GW4c3  GW4c4  GW4g1
1      9     10      7      8      4      1      2      1      1     14
GW4g2  GW4g3  GW4g4   GW4q  GW5c1  GW5c2  GW5c3  GW5c4  GW5g1  GW5g2  GW5g3
17     14     25      5      1      1      1      3      7     13     13
GW5g4   GW5q MYS1c1 MYS1c2 MYS1c3 MYS1c4 MYS1g1 MYS1g2 MYS1g3 MYS1g4  MYS1q
14      8      2      2      1      1      8     10      4     12      4
MYS2c1 MYS2c2 MYS2c3 MYS2c4 MYS2g1 MYS2g2 MYS2g3 MYS2g4  MYS2q  NL1c1  NL1c2
2      3      3      4     17     12     14     15      5      1      2
NL1c3  NL1c4  NL1g1  NL1g2  NL1g3  NL1g4   NL1q  NL2c1  NL2c2  NL2c3  NL2c4
2      3     10     18     11     10      5      3      5      3      2
NL2g1  NL2g2  NL2g3  NL2g4   NL2q NST1c1 NST1c2 NST1c3 NST1c4 NST1g1 NST1g2
9     11      9     12      6     10      6      4      9      9     10
NST1g3 NST1g4  NST1q NST2c1 NST2c2 NST2c3 NST2c4 NST2g1 NST2g2 NST2g3 NST2g4
6     14      1      1      2      1      3     12      6      9      9
NST2q NSW1c1 NSW1c2 NSW1c3 NSW1c4 NSW1g1 NSW1g2 NSW1g3 NSW1g4  NSW1q  QP1c1
6      2      2      2      1      4      9     13     11      4      4
QP1c2  QP1c3  QP1c4  QP1g1  QP1g2  QP1g3  QP1g4   QP1q TLS1c1 TLS1c2 TLS1c3
2      2      4     10     12      7     10      5      1      2      2
TLS1c4 TLS1g1 TLS1g2 TLS1g3 TLS1g4  TLS1q  XF1c1  XF1c2  XF1c3  XF1c4  XF1g1
3     13     14     15     19      3      3      1      2      4     13
XF1g2  XF1g3  XF1g4   XF1q  XF2c1  XF2c2  XF2c3  XF2c4  XF2g1  XF2g2  XF2g3
8     20     22      5      3      3      2      2      8      5     12
XF2g4   XF2q  XF3c1  XF3c2  XF3c3  XF3c4  XF3g1  XF3g2  XF3g3  XF3g4   XF3q
8      3      3      4      4      3     11     14      8      9      2
YL1c1  YL1c2  YL1c3  YL1c4  YL1g1  YL1g2  YL1g3  YL1g4   YL1q  YL2c1  YL2c2
3      5      6      5     11     16     14     12      3      8      8
YL2c3  YL2c4  YL2g1  YL2g2  YL2g3  YL2g4   YL2q  YL3c1  YL3c2  YL3c3  YL3c4
11     11      5      8     13     22      4      1      3      3      4
YL3g1  YL3g2  YL3g3  YL3g4   YL3q  YL4c1  YL4c2  YL4c3  YL4c4  YL4g1  YL4g2
8     11      7      9      6      3      2      4      4      9     10
YL4g3  YL4g4   YL4q  YL5c1  YL5c2  YL5c3  YL5c4  YL5g1  YL5g2  YL5g3  YL5g4
12     11      3      3      4      2      6     10      7      7     13
YL5q  YL6c1  YL6c2  YL6c3  YL6c4  YL6g1  YL6g2  YL6g3  YL6g4   YL6q  YL7c1
7      2      2      1      4      4      5      7      8      2      2
YL7c2  YL7c3  YL7c4  YL7g1  YL7g2  YL7g3  YL7g4   YL7q YL8Mc1 YL8Mc2 YL8Mc3
3      2      6      7      9     10     13      1      3      1      1
YL8Mc4 YL8Mg1 YL8Mg2 YL8Mg3 YL8Mg4  YL8Mq YL8Pc1 YL8Pc2 YL8Pc3 YL8Pc4 YL8Pg1
4      7      9      3      8      3      2      3      4      7     11
YL8Pg2 YL8Pg3 YL8Pg4  YL8Pq  YL9c1  YL9c2  YL9c3  YL9c4  YL9g1  YL9g2  YL9g3
6      8     10      3      4      3      3      5     10     11     12
YL9g4   YL9q
17      9
`;

const str5 = `
A1c1      A1c2      A1c3      A1c4      A1g1      A1g2      A1g3      A1g4
NaN 0.9910761       NaN       NaN 0.9963743 0.5522182 0.7245088 0.5430449
A1q      A2c1      A2c2      A2c3      A2c4      A2g1      A2g2      A2g3
0.5915826 0.9910761 0.5225594       NaN       NaN 0.6857151 0.4792967 0.7350040
A2g4       A2q     BY1c1     BY1c2     BY1c3     BY1c4     BY1g1     BY1g2
0.7221258 0.4423566 0.7553754       NaN 0.4005431 0.5301467 0.8601806 0.8481028
BY1g3     BY1g4      BY1q     CT1c1     CT1c2     CT1c3     CT1c4     CT1g1
0.8631181 0.8158536 0.4630882       NaN 0.4969627 0.5456339 0.6173206 0.7430868
CT1g2     CT1g3     CT1g4      CT1q     CT2c1     CT2c2     CT2c3     CT2c4
0.6712998 0.6193866 0.5986439       NaN       NaN 0.3033748 0.8573033 0.3851217
CT2g1     CT2g2     CT2g3     CT2g4      CT2q     FW1c1     FW1c2     FW1c3
0.6381240 0.7967032 0.7474303 0.8265505 0.7666659 0.8812909 0.6407620 0.7818446
FW1c4     FW1g1     FW1g2     FW1g3     FW1g4      FW1q     GW1c1     GW1c2
NaN 0.7410365 0.9486833 0.6770930 0.7091479       NaN       NaN       NaN
GW1c3     GW1c4     GW1c5     GW1g1     GW1g2     GW1g3     GW1g4     GW1g5
0.9968869 0.6513088 0.9321116 0.8048359 0.8668008 0.9285552 0.8216209 0.8641727
GW1q     GW2c1     GW2c2     GW2c3     GW2c4     GW2g1     GW2g2     GW2g3
0.7925128 0.7219281 0.5916728       NaN 0.9402860 0.7689635 0.6204528 0.8541876
GW2g4      GW2q     GW3c1     GW3c2     GW3c3     GW3c4     GW3g1     GW3g2
0.7210275 0.6046475       NaN       NaN       NaN       NaN 0.6666693 0.6991516
GW3g3     GW3g4      GW3q     GW4c1     GW4c2     GW4c3     GW4c4     GW4g1
0.4844336 0.6916813 0.3682451       NaN 0.6840384       NaN       NaN 0.8792365
GW4g2     GW4g3     GW4g4      GW4q     GW5c1     GW5c2     GW5c3     GW5c4
0.9487715 0.6772412 0.8680934 0.6494171       NaN       NaN       NaN 0.7435882
GW5g1     GW5g2     GW5g3     GW5g4      GW5q    MYS1c1    MYS1c2    MYS1c3
0.5845610 0.4909669 0.6561535 0.7484804 0.4478597 0.4912373 0.9957275       NaN
MYS1c4    MYS1g1    MYS1g2    MYS1g3    MYS1g4     MYS1q    MYS2c1    MYS2c2
NaN 0.7608054 0.7081526 0.7146461 0.7945469 0.2745349 0.6500224 0.7896901
MYS2c3    MYS2c4    MYS2g1    MYS2g2    MYS2g3    MYS2g4     MYS2q     NL1c1
0.9431888 0.8659761 0.8891063 0.5864239 0.7745197 0.7976230 0.3111302       NaN
NL1c2     NL1c3     NL1c4     NL1g1     NL1g2     NL1g3     NL1g4      NL1q
0.9402860 0.3912436 0.3978606 0.7942457 0.5347123 0.7539458 0.8398158 0.5370979
NL2c1     NL2c2     NL2c3     NL2c4     NL2g1     NL2g2     NL2g3     NL2g4
0.7823758 0.9756775 0.8979177 0.2538784 0.6421691 0.7326103 0.8347046 0.8174128
NL2q    NST1c1    NST1c2    NST1c3    NST1c4    NST1g1    NST1g2    NST1g3
0.6858945 0.7171732 0.8796747 0.8708389 0.6625137 0.8072829 0.6430251 0.4469650
NST1g4     NST1q    NST2c1    NST2c2    NST2c3    NST2c4    NST2g1    NST2g2
0.4595834       NaN       NaN 0.9182958       NaN 0.3855875 0.8109861 0.6162848
NST2g3    NST2g4     NST2q    NSW1c1    NSW1c2    NSW1c3    NSW1c4    NSW1g1
0.6546380 0.6107934 0.2720831 0.8631206 0.8974272 0.4574322       NaN 0.8571489
NSW1g2    NSW1g3    NSW1g4     NSW1q     QP1c1     QP1c2     QP1c3     QP1c4
0.8565772 0.8411393 0.7052957 0.3738071 0.6006227 0.5032583 0.2055925 0.5192058
QP1g1     QP1g2     QP1g3     QP1g4      QP1q    TLS1c1    TLS1c2    TLS1c3
0.6517724 0.6287701 0.7547430 0.7572332 0.4729363       NaN 0.3372901 0.9709506
TLS1c4    TLS1g1    TLS1g2    TLS1g3    TLS1g4     TLS1q     XF1c1     XF1c2
0.4641886 0.7819925 0.6749470 0.8909424 0.7635278 0.3624310 0.9206198       NaN
XF1c3     XF1c4     XF1g1     XF1g2     XF1g3     XF1g4      XF1q     XF2c1
0.2608629 0.4293136 0.7990848 0.5912448 0.8150985 0.7550482 0.3305979 0.4129691
XF2c2     XF2c3     XF2c4     XF2g1     XF2g2     XF2g3     XF2g4      XF2q
0.3888141 0.2538784 0.2811938 0.9287872 0.7625825 0.9290440 0.8938165 0.4515691
XF3c1     XF3c2     XF3c3     XF3c4     XF3g1     XF3g2     XF3g3     XF3g4
0.6749558 0.6082579 0.9022926 0.6012848 0.6800890 0.6858217 0.5065932 0.7457982
XF3q     YL1c1     YL1c2     YL1c3     YL1c4     YL1g1     YL1g2     YL1g3
0.2055925 0.8895952 0.7524819 0.8496471 0.9426312 0.8881532 0.9028848 0.8684346
YL1g4      YL1q     YL2c1     YL2c2     YL2c3     YL2c4     YL2g1     YL2g2
0.7830337 0.6398244 0.8438982 0.8011209 0.8437369 0.9403158 0.6774618 0.6747654
YL2g3     YL2g4      YL2q     YL3c1     YL3c2     YL3c3     YL3c4     YL3g1
0.7237606 0.7485338 0.4380379       NaN 0.8075743 0.9821410 0.4554776 0.7050017
YL3g2     YL3g3     YL3g4      YL3q     YL4c1     YL4c2     YL4c3     YL4c4
0.8878686 0.7823043 0.6242818 0.5928571 0.8609632 0.9910761 0.8920796 0.8764392
YL4g1     YL4g2     YL4g3     YL4g4      YL4q     YL5c1     YL5c2     YL5c3
0.8181504 0.6398956 0.6610295 0.7204276 0.5970948 0.8409160 0.8251726 0.9910761
YL5c4     YL5g1     YL5g2     YL5g3     YL5g4      YL5q     YL6c1     YL6c2
0.7934671 0.7269761 0.8087310 0.3521718 0.8363662 0.6471010 0.3372901 0.7578785
YL6c3     YL6c4     YL6g1     YL6g2     YL6g3     YL6g4      YL6q     YL7c1
NaN 0.9231770 0.7874690 0.7386169 0.4751446 0.4689531 0.4305519 0.9852281
YL7c2     YL7c3     YL7c4     YL7g1     YL7g2     YL7g3     YL7g4      YL7q
0.8699155 0.8112781 0.6619593 0.5353113 0.8142526 0.6476785 0.6008924       NaN
YL8Mc1    YL8Mc2    YL8Mc3    YL8Mc4    YL8Mg1    YL8Mg2    YL8Mg3    YL8Mg4
0.8366681       NaN       NaN 0.7596984 0.6587249 0.6444955 0.1561413 0.7110665
YL8Mq    YL8Pc1    YL8Pc2    YL8Pc3    YL8Pc4    YL8Pg1    YL8Pg2    YL8Pg3
0.6080560 0.6500224 0.7315976 0.9329895 0.7790631 0.6442742 0.6253675 0.4355696
YL8Pg4     YL8Pq     YL9c1     YL9c2     YL9c3     YL9c4     YL9g1     YL9g2
0.7368153 0.6790682 0.8197261 0.7890153 0.8586727 0.7971089 0.6906135 0.7663617
YL9g3     YL9g4      YL9q
0.6995977 0.7257935 0.5699867
`;


module.exports = {
    str1, str2, str3, str4, str5
}