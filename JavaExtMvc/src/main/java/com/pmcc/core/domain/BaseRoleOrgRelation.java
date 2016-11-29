package com.pmcc.core.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 角色、机构关系
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_ROLE_ORG_RELATION")
public class BaseRoleOrgRelation implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BaseRole role;//角色ID

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "ORG_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BaseOrganization organization;//组织机构

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BaseRole getRole() {
        return role;
    }

    public void setRole(BaseRole role) {
        this.role = role;
    }

    public BaseOrganization getOrganization() {
        return organization;
    }

    public void setOrganization(BaseOrganization organization) {
        this.organization = organization;
    }
}
