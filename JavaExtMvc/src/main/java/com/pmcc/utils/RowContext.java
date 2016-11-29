package com.pmcc.utils;

/**
 * Created by cc on 16/7/26.
 */
public class RowContext extends ViewSendsFilesList {
    private String row;

    public RowContext() {
    }

    public RowContext(String row) {
        this.row = row;
    }

    public String getRow() {
        return row;
    }

    public void setRow(String row) {
        this.row = row;
    }
}
