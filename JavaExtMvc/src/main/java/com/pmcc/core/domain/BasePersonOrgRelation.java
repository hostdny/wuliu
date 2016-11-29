package com.pmcc.core.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 用户和组织机构关系表
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_PERSON_ORG_RELATION")
public class BasePersonOrgRelation implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "PERSON_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BasePersonInfo person;//用户

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "ORG_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BaseOrganization organization;//组织机构

    public BasePersonOrgRelation() {
    }

    public BasePersonOrgRelation(String personId, String organizationId) {
        this.person = new BasePersonInfo(personId);
        this.organization = new BaseOrganization(organizationId);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BasePersonInfo getPerson() {
        return person;
    }

    public void setPerson(BasePersonInfo person) {
        this.person = person;
    }

    public BaseOrganization getOrganization() {
        return organization;
    }

    public void setOrganization(BaseOrganization organization) {
        this.organization = organization;
    }
}
