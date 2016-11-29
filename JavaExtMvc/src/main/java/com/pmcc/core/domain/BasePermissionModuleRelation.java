package com.pmcc.core.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 权限功能菜单关系表
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_PERMISSION_MODULE_RELATION")
public class BasePermissionModuleRelation implements Serializable {

    @Id
    @GenericGenerator(name = "systemUUID", strategy = "uuid")
    @GeneratedValue(generator = "systemUUID")
    @Column(name = "OID")
    private String id;

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "MODULE_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BaseModule module;//菜单功能

    @ManyToOne(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JoinColumn(name = "PERMISSION_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BasePermission permission;//权限

    public BasePermissionModuleRelation() {
    }

    public BasePermissionModuleRelation(String moduleId, String permissionId) {
        this.module = new BaseModule(moduleId);
        this.permission = new BasePermission(permissionId);
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public BaseModule getModule() {
        return module;
    }

    public void setModule(BaseModule module) {
        this.module = module;
    }

    public BasePermission getPermission() {
        return permission;
    }

    public void setPermission(BasePermission permission) {
        this.permission = permission;
    }
}
