package com.ngx.components;

import javax.swing.JPanel;
import java.awt.AlphaComposite;
import java.awt.Graphics;
import java.awt.Graphics2D;

public class TranslucentPanel extends JPanel {
    private float alpha = 1f;

    public TranslucentPanel() {
        setOpaque(false);
    }

    public float getAlpha() {
        return alpha;
    }

    public void setAlpha(float alpha) {
        this.alpha = alpha;
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        Graphics2D g2d = (Graphics2D) g.create();
        g2d.setColor(getBackground());
        g2d.setComposite(AlphaComposite.SrcOver.derive(getAlpha()));
        g2d.fillRect(0, 0, getWidth(), getHeight());
        g2d.dispose();
    }
}