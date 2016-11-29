package com.pmcc.core.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 用户角色关系表
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_PERSON_ROLE_RELATION")
public class BasePersonRoleRelation implements Serializable {

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
    @JoinColumn(name = "ROLE_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BaseRole role;//角色

    public BasePersonRoleRelation() {
    }

    public BasePersonRoleRelation(String personId, String roleId) {
        this.person = new BasePersonInfo(personId);
        this.role = new BaseRole(roleId);
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

    public BaseRole getRole() {
        return role;
    }

    public void setRole(BaseRole role) {
        this.role = role;
    }
}
