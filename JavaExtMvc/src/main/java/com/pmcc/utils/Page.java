package com.pmcc.utils;

import java.util.Collections;
import java.util.List;

/**
 * 分页工具类
 * Created by Admin on 2016/1/25.
 */
public class Page<T> {
    public static final String ASC = "asc";
    public static final String DESC = "desc";
    protected int page = 1; // 当前页码
    protected int limit = 10; // 每页数量
    protected int pageSize; // 总页数
    // [{"property":"createTime","direction":"DESC"},{"property":"age","direction":"ASC"}]
    protected String sort = null;
    protected long total = 0l;
    protected int start = 0;

    public Page() {
    }

    public int getPage() {
        return page;
    }

    public void setPage(int page) {
        this.page = page;
    }

    public int getLimit() {
        return limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public long getTotal() {
        return total;
    }

    public void setTotal(long total) {
        this.total = total;
    }

    public int getStart() {
        return start;
    }

    public void setStart(int start) {
        this.start = start;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }
}
