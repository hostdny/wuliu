package com.pmcc.core.domain;

import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

/**
 * Created by Administrator on 2016/11/29.
 */

@Entity
@Table(name = "base_bankservice")
public class BaseBankService {


    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @Column(name = "ACCOUNT_NO")
    private String accountNo;

    @Column(name = "BUSINESS_TYPE")
    private String businessType;

    @Column(name = "TARGET_ACCOUNT")
    private String targetAccount;


    @Column(name = "AMOUNT")
    private String amount;

    @Column(name = "REQUEST_PERSON")
    private String requestPerson;

    @Column(name = "AMOUNT")
    private String amount;


    @Column(name = "AMOUNT")
    private String amount;



}
