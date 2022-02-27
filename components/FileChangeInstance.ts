import { Dispatch, SetStateAction } from "react";

export class FileChangeInstance {
  private styles: any;
  private setNewMedia: any;
  private setPortrait: any;
  private setSameImageSize: any;
  private portrait: boolean;
  private sameImageSize: boolean;

  constructor({ styles, setNewMedia, setPortrait, setSameImageSize, portrait, sameImageSize }: any) {
    this.styles = styles;
    this.setNewMedia = setNewMedia;
    this.setPortrait = setPortrait;
    this.setSameImageSize = setSameImageSize;
    this.portrait = portrait;
    this.sameImageSize = sameImageSize;
  }

  onMediaChange(e: any) {
    const {
      target: { files },
    } = e;

    const theFiles = files[0];
    const reader = new FileReader();
    reader.onloadend = (finishedEvent) => {
      const {
        currentTarget: { result },
      }: any = finishedEvent;

      let img = new Image();
      img.src = result;
      img.onload = () => {
        if (img.width > img.height) {
          this.setPortrait(false);
          this.setSameImageSize(false);
        } else if (img.width == img.height) {
          this.setPortrait(false);
          this.setSameImageSize(true);
        } else {
          this.setPortrait(true);
          this.setSameImageSize(false);
        }
      };
      console.log(result);

      // this.setNewMedia(result);
    };
    reader.readAsDataURL(theFiles);
  }

  imageSizeCSS = (): string => {
    if (this.portrait) {
      return this.styles.ig_media_preview_portrait;
    } else {
      if (this.sameImageSize) {
        return this.styles.ig_media_preview_sameSize;
      } else {
        return this.styles.ig_media_preview_landScape;
      }
    }
  };

  clearPhoto = () => {
    this.setNewMedia("");
    this.setPortrait(false);
    this.setSameImageSize(false);
  };
}
