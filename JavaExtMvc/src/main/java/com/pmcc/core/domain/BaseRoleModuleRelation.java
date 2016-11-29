package com.pmcc.core.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 角色菜单关系表
 * Created by LvXL on 2016/6/23.
 */
@Entity
@Table(name = "BASE_ROLE_MODULE_RELATION")
public class BaseRoleModuleRelation implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "ROLE_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BaseRole role;//角色

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "MODULE_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BaseModule module;//菜单功能

    public BaseRoleModuleRelation() {
    }

    public BaseRoleModuleRelation(String roleId, String moduleId) {
        this.role = new BaseRole(roleId);
        this.module = new BaseModule(moduleId);
    }

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

    public BaseModule getModule() {
        return module;
    }

    public void setModule(BaseModule module) {
        this.module = module;
    }
}
