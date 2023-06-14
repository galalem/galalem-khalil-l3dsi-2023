package com.ngx.components;

import java.awt.Dimension;
import java.awt.Graphics;
import java.awt.image.BufferedImage;
import javax.swing.JPanel;
public class BackgroundPanel extends JPanel {

    private BufferedImage backgroundImage;

    public BackgroundPanel(BufferedImage backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    public BufferedImage getBackgroundImage() {
        return this.backgroundImage;
    }
    public void setBackgroundImage(BufferedImage backgroundImage) {
        this.backgroundImage = backgroundImage;
    }

    @Override
    public Dimension getPreferredSize() {
        if (this.backgroundImage == null)
            return super.getPreferredSize();
        return new Dimension(this.backgroundImage.getWidth(), this.backgroundImage.getHeight());
    }

    @Override
    protected void paintComponent(Graphics g) {
        super.paintComponent(g);
        if (this.backgroundImage == null)
            return;
        int x = (getWidth() - this.backgroundImage.getWidth()) / 2;
        int y = (getHeight() - this.backgroundImage.getHeight()) / 2;
        //g.drawImage(this.backgroundImage, x, y, this);
        g.drawImage(this.backgroundImage, 0, 0, this.getWidth(), this.getHeight(), this);
    }
}
