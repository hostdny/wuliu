package com.pmcc.core.domain;

import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;

/**
 * 角色权限关系表
 * Created by LvXL on 2016/6/22.
 */
@Entity
@Table(name = "BASE_ROLE_PERMISSION_RELATION")
public class BaseRolePermissionRelation implements Serializable {

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
    @JoinColumn(name = "PERMISSION_ID")
    @org.hibernate.annotations.Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
    private BasePermission permission;//权限

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

    public BasePermission getPermission() {
        return permission;
    }

    public void setPermission(BasePermission permission) {
        this.permission = permission;
    }
}
